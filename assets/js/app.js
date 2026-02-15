let siteData = null;

// データの読み込み
async function init() {
    try {
        const response = await fetch('data/train_data.json');
        siteData = await response.json();
        showHome();
    } catch (error) {
        console.error('データの読み込みに失敗しました:', error);
        document.getElementById('content-area').innerHTML = '<p>データの読み込みに失敗しました。</p>';
    }
}

// ホーム表示（会社一覧）
function showHome() {
    updateBreadcrumb([]);
    const content = document.getElementById('content-area');
    let html = '<h2>鉄道会社を選択</h2><div class="grid">';
    
    siteData.companies.forEach(company => {
        html += `
            <div class="card" onclick="showTrainTypes('${company.id}')">
                <h3>${company.name}</h3>
            </div>
        `;
    });
    
    html += '</div>';
    content.innerHTML = html;
}

// 形式一覧表示
function showTrainTypes(companyId) {
    const company = siteData.companies.find(c => c.id === companyId);
    updateBreadcrumb([{ name: company.name, id: companyId, type: 'company' }]);
    
    const content = document.getElementById('content-area');
    let html = `<h2>${company.name} - 形式を選択</h2><div class="grid">`;
    
    company.train_types.forEach(type => {
        html += `
            <div class="card" onclick="showFormations('${companyId}', '${type.id}')">
                <h3>${type.name}</h3>
            </div>
        `;
    });
    
    html += '</div>';
    content.innerHTML = html;
}

// 編成一覧表示
function showFormations(companyId, typeId) {
    const company = siteData.companies.find(c => c.id === companyId);
    const type = company.train_types.find(t => t.id === typeId);
    
    updateBreadcrumb([
        { name: company.name, id: companyId, type: 'company' },
        { name: type.name, id: typeId, type: 'type', companyId: companyId }
    ]);
    
    const content = document.getElementById('content-area');
    let html = `<h2>${type.name} - 編成を選択</h2><div class="grid">`;
    
    type.formations.forEach(formation => {
        html += `
            <div class="card" onclick="showPhotos('${companyId}', '${typeId}', '${formation.id}')">
                <h3>${formation.name}</h3>
                <p>${formation.photos.length} 枚の写真</p>
            </div>
        `;
    });
    
    html += '</div>';
    content.innerHTML = html;
}

// 写真一覧表示
function showPhotos(companyId, typeId, formationId) {
    const company = siteData.companies.find(c => c.id === companyId);
    const type = company.train_types.find(t => t.id === typeId);
    const formation = type.formations.find(f => f.id === formationId);
    
    updateBreadcrumb([
        { name: company.name, id: companyId, type: 'company' },
        { name: type.name, id: typeId, type: 'type', companyId: companyId },
        { name: formation.name, id: formationId, type: 'formation' }
    ]);
    
    const content = document.getElementById('content-area');
    let html = `<h2>${formation.name} の写真</h2><div class="photo-grid">`;
    
    formation.photos.forEach(photo => {
        html += `
            <div class="photo-item">
                <img src="${photo.url}" alt="${photo.description}" onerror="this.src='https://via.placeholder.com/400x300?text=No+Image'">
                <div class="photo-info">
                    <p class="photo-location">${photo.location}</p>
                    <p class="photo-date">${photo.date}</p>
                    <p class="photo-desc">${photo.description}</p>
                </div>
            </div>
        `;
    });
    
    html += '</div>';
    content.innerHTML = html;
}

// パンくずリストの更新
function updateBreadcrumb(items) {
    const nav = document.getElementById('breadcrumb');
    let html = '<a href="#" onclick="showHome()">ホーム</a>';
    
    items.forEach((item, index) => {
        html += ' &gt; ';
        if (index === items.length - 1) {
            html += `<span>${item.name}</span>`;
        } else {
            if (item.type === 'company') {
                html += `<a href="#" onclick="showTrainTypes('${item.id}')">${item.name}</a>`;
            } else if (item.type === 'type') {
                html += `<a href="#" onclick="showFormations('${item.companyId}', '${item.id}')">${item.name}</a>`;
            }
        }
    });
    
    nav.innerHTML = html;
}

// 起動
init();
