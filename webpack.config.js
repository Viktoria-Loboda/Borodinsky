const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
	entry: {
		main: path.resolve(__dirname, './src/index.js')
	}, 
	output: {
		path: path.resolve(__dirname, './dist'),
		filename: '[name].js'
	},
	module: {
		rules: [
			{
				test: /\.pug$/,
				loader: 'pug-loader',
				exclude: '/node_modules/'
			},
			{
        test:  /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'postcss-loader',
          'css-loader'
        ]
      },
      {
	      test: /.(s*)css$/,
	      use: [
	        MiniCssExtractPlugin.loader,
	        'css-loader',
	        'postcss-loader',
	        
	        'sass-loader'
	      ],
    	},
		]
	},
	plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
    	inject: false,
      filename: "index.html",
      template: './src/pug/pages/index.pug'
    }),
    new CopyWebpackPlugin({
    	patterns: [
    		{ from: './src/images/', to: './images/' },
    		{ from: './src/fonts/', to: './fonts/' },
    	]
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    })
  ]
}

/*
 Что надо улучшить:
 1. разобраться с css и его минификацией minicssextractplugin
 2. разбить на версию для продакшена и разработки
 3. сделать чтобы все html выгружались jack coder полная настройка шаблонизатора pug
 4. сделать сжатие для всех картинок и шрифтов
 5. добавить карту для продакшена sourcemap
 6. добавить eslint
*/