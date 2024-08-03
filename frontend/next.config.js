/** @type {import('next').NextConfig} */
const webpack = require('webpack');
const withLess = require('next-with-less');
const lessToJS = require('less-vars-to-js');

const nextConfig = {
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
        config.plugins.push(new webpack.EnvironmentPlugin(process.env));
        return config;
    }
}

module.exports = nextConfig
