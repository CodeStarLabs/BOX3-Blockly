const path = require('path')
module.exports = [
    {
        entry: path.join(__dirname, './src/main.js'),
        output: {
            filename: 'main.js',
            path: path.resolve(__dirname, 'scripts')
        },
        module: {
            rules: [
                {
                    test: /\.css$/, 
                    use: 
                    [
                        {loader:'style-loader'},
                        {loader:'css-loader',options: {modules:true}},
                    ]   
                }
            ]
        },
        mode: 'production'
    },
    {
        entry: path.join(__dirname, './src/blocks.js'),
        output: {
            path: path.resolve(__dirname,'scripts'),
            filename: 'blocks.js'
        },
        mode: 'production'
    },
    {
        entry: path.join(__dirname, './src/custom_render.js'),
        output: {
            path: path.resolve(__dirname,'scripts'),
            filename: 'custom_render.js'
        },
        mode: 'development'
    }
]