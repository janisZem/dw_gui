/*
 * need some technic to define cardinality
 */
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
        parent: ['req', 'complexReq'],
        values: null,
        action: null
    },
    {
        id: 'complexReq',
        name: 'Complex Requirement',
        parent: ['req', 'complexReq'],
        action: null,
        values: null
    },
    {
        id: 'comp',
        name: 'Comparison',
        parent: ['complexReq', 'simpleCond', 'simpleExpr'],
        action: 'dropdown',
        values: ['>', '<', '>=', '<=', '=']
    },
    {
        id: 'expr',
        name: 'Expression',
        parent: ['simpleReq'],
        action: null,
        values: null
    },
    {
        id: 'simpleExpr',
        name: 'Simple Expression',
        parent: ['expr', 'simpleCond'],
        action: null,
        values: null
    },
    {
        id: 'complexExpr',
        name: 'Complex Expression',
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
        id: 'qualData',
        name: 'Qualifying Data',
        parent: ['simpleExpr', 'object'],
        action: 'input',
        values: null
    }, {
        id: 'quanData',
        name: 'Quantifying Data',
        parent: ['object'],
        action: 'input',
        values: null
    },
    {
        id: 'arithOper',
        name: 'Arithmetical Operator',
        parent: ['complexExpr', 'complexReq'],
        action: 'dropdown',
        values: ['+', '-', '*', '/']
    },
    {
        id: 'operation',
        name: 'Operation',
        parent: ['simpleReq'],
        action: null,
        values: null
    },
    {
        id: 'action',
        name: 'Action',
        parent: ['operation'],
        action: null,
        values: null
    },
    {
        id: 'aggr',
        name: 'Aggregation',
        parent: ['action'],
        action: 'dropdown',
        values: ['count', 'sum', 'avarage']
    },
    {
        id: 'refin',
        name: 'Refinement',
        parent: ['action'],
        action: 'dropdown',
        values: ['show']
    },
    {
        id: 'object',
        name: 'Object',
        parent: ['simpleReq', 'operation'],
        action: null,
        values: null
    },
    {
        id: 'typifiedCond',
        name: 'Typified Condition',
        parent: ['simpleReq'],
        action: null,
        values: null
    },
    {
        id: 'condType',
        name: 'Condition Type',
        parent: ['typifiedCond'],
        action: 'dropdown',
        values: ['where']
    },
    {
        id: 'complexCond',
        name: 'Complex Condition',
        parent: ['condition'],
        action: null,
        values: null
    },
    {
        id: 'simpleCond',
        name: 'Simple Condition',
        parent: ['complexCond', 'condition'],
        action: null,
        values: null
    },
    {
        id: 'logicalOper',
        name: 'Logical Operator',
        parent: ['complexCond'],
        action: 'dropdown',
        values: ['or', 'and', 'not']
    },
    {
        id: 'condition',
        name: 'Condition',
        parent: ['typifiedCond', 'complexCond'],
        action: null,
        values: null
    }

];