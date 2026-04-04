const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// In-memory store for Keto tuples
let ketoTuples = [
    { namespace: 'permission', object: 'dfspView', relation: 'granted', subject: 'role:Manager' },
    { namespace: 'permission', object: 'dfspManage', relation: 'granted', subject: 'role:Admin' },
];

const availableRoles = [
    'Admin',
    'Manager',
    'Operator',
    'Viewer'
];

const permissionMetadata = {
    'dfspManage': {
        description: 'Create, update, and delete DFSPs',
        endpoints: ['POST /api/dfsps', 'PUT /api/dfsps/:id', 'DELETE /api/dfsps/:id']
    },
    'dfspView': {
        description: 'View DFSP configurations and status',
        endpoints: ['GET /api/dfsps', 'GET /api/dfsps/:id']
    },
    'settlementManage': {
        description: 'Process and manage settlements',
        endpoints: ['POST /api/settlements', 'PUT /api/settlements/:id']
    },
    'settlementView': {
        description: 'View settlement reports and status',
        endpoints: ['GET /api/settlements', 'GET /api/settlements/:id', 'GET /api/settlements/reports']
    },
    'userManage': {
        description: 'Manage users and roles',
        endpoints: ['POST /api/users', 'PUT /api/users/:id', 'DELETE /api/users/:id']
    },
    'userView': {
        description: 'View users',
        endpoints: ['GET /api/users']
    }
};

app.get('/api/metadata', (req, res) => {
    res.json({
        roles: availableRoles,
        permissions: permissionMetadata
    });
});

app.get('/api/tuples', (req, res) => {
    res.json(ketoTuples);
});

app.post('/api/tuples', (req, res) => {
    const { namespace, object, relation, subject } = req.body;
    
    if (!namespace || !object || !relation || !subject) {
        return res.status(400).json({ error: 'Missing required parameters' });
    }

    // Check if tuple already exists
    const exists = ketoTuples.some(t => 
        t.namespace === namespace && 
        t.object === object && 
        t.relation === relation && 
        t.subject === subject
    );

    if (!exists) {
        ketoTuples.push({ namespace, object, relation, subject });
    }

    res.json({ success: true, tuple: { namespace, object, relation, subject } });
});

app.delete('/api/tuples', (req, res) => {
    const { namespace, object, relation, subject } = req.body;

    ketoTuples = ketoTuples.filter(t => 
        !(t.namespace === namespace && 
          t.object === object && 
          t.relation === relation && 
          t.subject === subject)
    );

    res.json({ success: true });
});

app.listen(PORT, () => {
    console.log(`Hub Operator server running on port ${PORT}`);
});
