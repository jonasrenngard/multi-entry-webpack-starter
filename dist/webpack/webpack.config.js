'use strict';Object.defineProperty(exports,"__esModule",{value:true});var _config=require('../config');var _config2=_interopRequireDefault(_config);var _webpack=require('webpack');var _webpack2=_interopRequireDefault(_webpack);var _path=require('path');var _path2=_interopRequireDefault(_path);var _os=require('os');var _os2=_interopRequireDefault(_os);var _extractTextWebpackPlugin=require('extract-text-webpack-plugin');var _extractTextWebpackPlugin2=_interopRequireDefault(_extractTextWebpackPlugin);var _chunkManifestWebpackPlugin=require('chunk-manifest-webpack-plugin');var _chunkManifestWebpackPlugin2=_interopRequireDefault(_chunkManifestWebpackPlugin);var _fixModuleidAndChunkidPlugin=require('fix-moduleid-and-chunkid-plugin');var _fixModuleidAndChunkidPlugin2=_interopRequireDefault(_fixModuleidAndChunkidPlugin);var _webpackNotifier=require('webpack-notifier');var _webpackNotifier2=_interopRequireDefault(_webpackNotifier);var _happypack=require('happypack');var _happypack2=_interopRequireDefault(_happypack);var _copyWebpackPlugin=require('copy-webpack-plugin');var _copyWebpackPlugin2=_interopRequireDefault(_copyWebpackPlugin);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}var __DEBUG__=_config2.default.__DEBUG__;var __DEV__=_config2.default.__DEV__;var bundleEntry=_config2.default.bundleEntry;var libEntry=_config2.default.libEntry;var nodeModulesDir=_config2.default.nodeModulesDir;var happyThreadPool=_happypack2.default.ThreadPool({size:_os2.default.cpus().length});var entries=libEntry;var webpackPlugins=[];var bundleEntryKeys=Object.keys(bundleEntry);bundleEntryKeys.forEach(function(key){Object.assign(entries,bundleEntry[key]);webpackPlugins.push(new _webpack2.default.optimize.CommonsChunkPlugin({name:key,filename:'[name].js',chunks:Object.keys(bundleEntry[key]),minChunks:2}));});if(!__DEV__&&_config2.default.copyWebpackPluginItems.length>0){webpackPlugins.push(new _copyWebpackPlugin2.default(_config2.default.copyWebpackPluginItems));}var config={entry:entries,output:Object.assign(_config2.default.output,{filename:'[name].js'}),resolve:{root:_config2.default.assetsSrcDirs,alias:{libs:_config2.default.libsDir,nodeModulesDir:nodeModulesDir},extensions:['','.js','.jsx']},module:{noParse:[],// preLoaders: [{
//     test: /\.js$/,
//     loader: 'eslint',
//     include: appConfig.assetsSrcDirs
// }],
loaders:[{test:/\.js[x]?$/,loader:'happypack/loader',include:_config2.default.assetsSrcDirs},{test:/\.json$/,loader:'json'},{test:/\.css$/,loader:_extractTextWebpackPlugin2.default.extract('style','css')},{test:/\.less$/,loader:_extractTextWebpackPlugin2.default.extract('style','css!less')},{test:/\.(png|jpe?g|gif)$/,loader:'url?limit=8192&name=img/[hash:8].[ext]'},{test:/\.(woff|woff2|eot|ttf|svg)(\?v=\d+\.\d+\.\d+)?$/,loader:'file?name=fonts/[name].[ext]'}]},plugins:[new _happypack2.default({threadPool:happyThreadPool,loaders:['babel']}),new _extractTextWebpackPlugin2.default('[name].css',{allChunks:true}),new _webpack2.default.NoErrorsPlugin(),new _webpack2.default.optimize.DedupePlugin(),new _webpack2.default.DefinePlugin({__DEBUG__:__DEBUG__,__DEV__:__DEV__}),new _chunkManifestWebpackPlugin2.default({filename:'chunk-manifest.json',manifestVariable:'webpackManifest'}),new _fixModuleidAndChunkidPlugin2.default(),new _webpackNotifier2.default({title:'webpack',excludeWarnings:true,skipFirstNotification:true,alwaysNotify:true})].concat(webpackPlugins)};_config2.default.noParseDeps.forEach(function(dep){// add the specific deps to noParse and alias
var depPath=_path2.default.resolve(nodeModulesDir,dep);config.resolve.alias[dep.split(_path2.default.sep)[0].replace('.','-')]=depPath;config.module.noParse.push(depPath);});config.module.loaders.push({test:new RegExp('('+_config2.default.noParseDeps.join('|')+')$'),loader:'imports?define=>false&module=>false&exports=>false&this=>window'});if(__DEV__){config.devtool='cheap-source-map';}else{if(!__DEBUG__){//do not compress code in debug mode
config.plugins.push(new _webpack2.default.optimize.UglifyJsPlugin({compress:{warnings:false,screw_ie8:true,sequences:true,dead_code:true,drop_debugger:true,comparisons:true,conditionals:true,evaluate:true,booleans:true,loops:true,unused:true,hoist_funs:true,if_return:true,join_vars:true,cascade:true,drop_console:true},output:{comments:false}}));}}exports.default=config;