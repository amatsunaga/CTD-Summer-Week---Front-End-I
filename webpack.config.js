
// Módulo de gestão caminho/URI.
const path = require('path');

// Variaveis do projeto
const DESTINO_DO_CODIGO_FONTE_DA_PRODUCAO = path.resolve( __dirname, 'public' );
const DESTINO_DO_CODIGO_FONTE_DE_DESENVOLIMENTO = path.resolve( __dirname, './src/app.js' );
const DESTINO_DO_TEMPLATE_HTML = './src/html/index.html';
const PORTA_DO_SERVIDOR = 1234;

// Importação do Webpack.
const wepack = require('webpack');

// Plugin(s) de terceiros para complementar as funcionalidades do Webpack.
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractWebpackPlugin = require('mini-css-extract-plugin');

module.exports = {

    // Arquivos de entrada do ambiente de desenvolvimento.
    entry: DESTINO_DO_CODIGO_FONTE_DE_DESENVOLIMENTO,

    // Arquivo de saída do código fonte para produção.
    output: { path: DESTINO_DO_CODIGO_FONTE_DA_PRODUCAO },

    // Configurações de um servidor.
    devServer: {
        static: DESTINO_DO_CODIGO_FONTE_DA_PRODUCAO,
        port:   PORTA_DO_SERVIDOR,
        compress: true,
        hot: "only"
    },

    // Configurações de uso dos Plugin(s) para gerar os arquivos de produção.
    module: {
        rules: [

            // Configuração de compilação e esportação do Sass.
            {
                test: /\.(sa|sc|c)ss$/,
                use: [MiniCssExtractWebpackPlugin.loader, 'css-loader', 'sass-loader']
            },

            // Configuração de compilação e esportação do CSS.
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader']
            },

            // Configuração de compilação e esportação do Javascript.
            // Não abordaremos implementações em Javascript, porém como
            // naturalmente os projetos exigem, deixei configurado para 
            // uso posterior. 
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },

            // Configuração de compilação e esportação do HTML.
            {
                test: /\.html$/i,
                use: 'html-loader',
            }

        ]
    },

    // Plugin(s) responsáveis por gerar os arquivos HTML e CSS do projeto.
    plugins: [
        new wepack.ProgressPlugin(),
        new wepack.optimize.ModuleConcatenationPlugin(),
        new HtmlWebpackPlugin({ template: DESTINO_DO_TEMPLATE_HTML }),
        new MiniCssExtractWebpackPlugin()
    ]

}