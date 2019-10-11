/**
 * *** NOTE ON IMPORTING FROM ANGULAR AND NGUNIVERSAL IN THIS FILE ***
 *
 * If your application uses third-party dependencies, you'll need to
 * either use Webpack or the Angular CLI's `bundleDependencies` feature
 * in order to adequately package them for use on the server without a
 * node_modules directory.
 *
 * However, due to the nature of the CLI's `bundleDependencies`, importing
 * Angular in this file will create a different instance of Angular than
 * the version in the compiled application code. This leads to unavoidable
 * conflicts. Therefore, please do not explicitly import from @angular or
 * @nguniversal in this file. You can export any needed resources
 * from your application's main.server.ts file, as seen below with the
 * import for `ngExpressEngine`.
 */

import 'zone.js/dist/zone-node';

import * as express from 'express';
import {join} from 'path';
import { existsSync, mkdirSync, readFileSync, writeFileSync, copyFileSync, readdirSync } from 'fs';

// Express server
const app = express();

const PORT = process.env.PORT || 4000;
const DIST_FOLDER = join(process.cwd(), 'dist/browser');
const STATIC_FOLDER = join(process.cwd(), 'dist/static');

// index.html template
const template = readFileSync(join(DIST_FOLDER, 'index.html')).toString();

// * NOTE :: leave this as require() since this file is built Dynamically from webpack
const {AppServerModuleNgFactory, LAZY_MODULE_MAP, ngExpressEngine, provideModuleMap, renderModuleFactory} = require('./dist/server/main');

// Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
app.engine('html', ngExpressEngine({
  bootstrap: AppServerModuleNgFactory,
  providers: [
    provideModuleMap(LAZY_MODULE_MAP)
  ]
}));

app.set('view engine', 'html');
app.set('views', DIST_FOLDER);

// Example Express Rest API endpoints
// app.get('/api/**', (req, res) => { });
// Serve static files from /browser
app.get('*.*', express.static(DIST_FOLDER, {
  maxAge: '1y'
}));

// All regular routes use the Universal engine
app.get('*', (req, res) => {
  res.render('index', { req });
});

if (process.env.PRERENDER) {

    const routes = require('./prerender.routes.js').prerenderRoutes;
    Promise.all(
        routes.map(route =>
            renderModuleFactory(AppServerModuleNgFactory, {
                document: template,
                url: route,
                extraProviders: [
                    provideModuleMap(LAZY_MODULE_MAP)
                ]
            }).then(html => [route, html])
        )
    ).then(results => {
        results.forEach(([route, html]) => {
            const fullPath = join(STATIC_FOLDER, route);
            if (!existsSync(fullPath)) { mkdirSync(fullPath) }
            console.log('Writing file:', route );
            writeFileSync(join(fullPath, 'index.html'), html);
        });
        // copy the other resources
        const files = readdirSync(DIST_FOLDER);

        files.forEach( file => {
            if(file !== 'index.html') {
                const source = join(DIST_FOLDER, file);
                const dest = join(STATIC_FOLDER, file);
                console.log('Copying', source, dest);
                copyFileSync(source, dest);
            }
        });
        process.exit();
    });

} else if (!process.env.FUNCTION_NAME) {

    app.listen(PORT, () => {
        console.log(`Node Express server listening on http://localhost:${PORT}`);
    });

}


// // Start up the Node server
// app.listen(PORT, () => {
//   console.log(`Node Express server listening on http://localhost:${PORT}`);
// });
