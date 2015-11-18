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
        id: 'ComplexExpr',
        name: 'Complex Expresion',
        parent: ['expr'],
        action: null,
        values: null
    }
];