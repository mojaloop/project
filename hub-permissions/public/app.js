document.addEventListener('DOMContentLoaded', init);

let roles = [];
let permissions = {};
let tuples = [];

async function init() {
    try {
        await fetchData();
        renderMatrix();
    } catch (err) {
        console.error('Failed to initialize:', err);
        showToast('Error loading data from Hub API');
    }
}

async function fetchData() {
    const metaRes = await fetch('/api/metadata');
    const metadata = await metaRes.json();
    roles = metadata.roles;
    permissions = metadata.permissions;

    const tuplesRes = await fetch('/api/tuples');
    tuples = await tuplesRes.json();
}

function isGranted(permission, role) {
    return tuples.some(t => 
        t.namespace === 'permission' &&
        t.object === permission &&
        t.relation === 'granted' &&
        t.subject === `role:${role}`
    );
}

function renderMatrix() {
    const headerRow = document.getElementById('matrix-header');
    const tbody = document.getElementById('matrix-body');

    // Render Headers
    headerRow.innerHTML = '<th>Permission</th>';
    roles.forEach(role => {
        const th = document.createElement('th');
        th.textContent = role;
        headerRow.appendChild(th);
    });

    // Render Rows
    tbody.innerHTML = '';
    const permKeys = Object.keys(permissions);
    
    permKeys.forEach(permKey => {
        const tr = document.createElement('tr');
        tr.className = 'perm-row';
        tr.dataset.permission = permKey;
        
        // Permission Name
        const tdName = document.createElement('td');
        tdName.textContent = permKey;
        tr.appendChild(tdName);

        // Roles Checkboxes
        roles.forEach(role => {
            const td = document.createElement('td');
            const label = document.createElement('label');
            label.className = 'checkbox-container';
            label.title = `Assign ${permKey} to ${role}`;
            
            const input = document.createElement('input');
            input.type = 'checkbox';
            input.checked = isGranted(permKey, role);
            
            input.addEventListener('change', async (e) => {
                const granted = e.target.checked;
                await togglePermission(permKey, role, granted);
            });

            const span = document.createElement('span');
            span.className = 'checkmark';

            label.appendChild(input);
            label.appendChild(span);
            td.appendChild(label);
            tr.appendChild(td);
        });

        // Hover effect for real-time validation
        tr.addEventListener('mouseenter', () => showPermissionDetail(permKey));

        tbody.appendChild(tr);
    });
}

function showPermissionDetail(permKey) {
    const detailSection = document.getElementById('permission-detail');
    const permInfo = permissions[permKey];

    if (!permInfo) return;

    let endpointsHtml = permInfo.endpoints.map(ep => {
        const [method, ...pathParts] = ep.split(' ');
        const path = pathParts.join(' ');
        return `
            <div class="endpoint-item">
                <span class="endpoint-method method-${method}">${method}</span>
                <span class="endpoint-path">${path}</span>
            </div>
        `;
    }).join('');

    detailSection.className = 'detail-content';
    detailSection.innerHTML = `
        <div class="detail-title">${permKey}</div>
        <div class="detail-desc">${permInfo.description}</div>
        <div class="endpoint-list">
            ${endpointsHtml}
        </div>
    `;
}

async function togglePermission(permission, role, granted) {
    const payload = {
        namespace: 'permission',
        object: permission,
        relation: 'granted',
        subject: `role:${role}`
    };

    try {
        const method = granted ? 'POST' : 'DELETE';
        const res = await fetch('/api/tuples', {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (res.ok) {
            const action = granted ? 'Granted' : 'Revoked';
            const htmlMessage = `
                <div>${action} <strong>${permission}</strong> for <strong>${role}</strong></div>
                <div class="tuple-code">
                    ${granted ? '+' : '-'} { namespace: "permission", object: "${permission}", relation: "granted", subject: "role:${role}" }
                </div>
            `;
            showToast(htmlMessage, true);
        } else {
            throw new Error('API Error');
        }
    } catch (err) {
        console.error('Failed to toggle permission:', err);
        showToast('Failed to update permission. Refer to console.');
        // Refetch and re-render to revert invalid state
        await fetchData();
        renderMatrix();
    }
}

let toastTimeout;
function showToast(messageHtml, isHtml = false) {
    const toast = document.getElementById('toast');
    
    if (isHtml) {
        toast.innerHTML = messageHtml;
    } else {
        toast.textContent = messageHtml;
    }

    toast.classList.add('show');

    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
        toast.classList.remove('show');
    }, 4000);
}
