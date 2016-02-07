var cfg = [
    {
        id: 'req',
        name: 'Requirement',
        parent: null,
        values: null,
        action: null
    },
    {
        id: 'simpleReq',
        name: 'Simple Requirement',
        parent: ['req'],
        values: null,
        action: 'dropown'
    },
    {
        id: 'complexReq',
        name: 'Complex Requirement',
        parent: ['req'],
        action: null,
        values: null
    },
    {
        id: 'comp',
        name: 'Comparison',
        parent: ['complexReq'],
        action: 'dropdown',
        values: ['>', '<', '>=', '<=', '=']
    },
    {
        id: 'expr',
        name: 'Expresion',
        parent: ['simpleReq'],
        action: null,
        values: null
    },
    {
        id: 'simpleExpr',
        name: 'Simple Expresion',
        parent: ['expr'],
        action: null,
        values: null
    },
    {
        id: 'complexExpr',
        name: 'Complex Expresion',
        parent: ['expr'],
        action: null,
        values: null
    },
    {
        id: 'const',
        name: 'Constant',
        parent: ['simpleExpr'],
        action: 'input',
        values: null
    },
    {
        id: 'quanData',
        name: 'Qualifying Data',
        parent: ['simpleExpr'],
        action: 'input',
        values: null
    },
    {
        id: 'arithOper',
        name: 'Arithmetical Operator',
        parent: ['complexExpr', 'complexReq'],
        action: 'dropdown',
        values: ['+', '-', '*', '/']
    }

];