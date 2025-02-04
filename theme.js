// 主题切换功能
document.addEventListener('DOMContentLoaded', function() {
    // 添加设置按钮和面板到body
    if (!document.querySelector('.settings-btn')) {
        const settingsBtn = document.createElement('button');
        settingsBtn.className = 'settings-btn';
        settingsBtn.id = 'settings-btn';
        settingsBtn.setAttribute('aria-label', '打开设置');
        settingsBtn.textContent = '⚙️';
        
        const settingsPanel = document.createElement('div');
        settingsPanel.className = 'settings-panel';
        settingsPanel.id = 'settings-panel';
        
        const themeSwitch = document.createElement('div');
        themeSwitch.className = 'theme-switch';
        
        const label = document.createElement('label');
        label.setAttribute('for', 'theme-toggle');
        label.innerHTML = '深色模式<input type="checkbox" id="theme-toggle">';
        
        themeSwitch.appendChild(label);
        settingsPanel.appendChild(themeSwitch);
        
        document.body.appendChild(settingsBtn);
        document.body.appendChild(settingsPanel);
    }

    const themeToggle = document.getElementById('theme-toggle');
    const settingsBtn = document.getElementById('settings-btn');
    const settingsPanel = document.getElementById('settings-panel');
    
    // 默认设置为深色模式
    if (!localStorage.getItem('theme')) {
        localStorage.setItem('theme', 'dark');
        document.documentElement.setAttribute('data-theme', 'dark');
    }

    // 从localStorage读取主题设置
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeToggle.checked = true;
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        themeToggle.checked = false;
    }

    // 主题切换处理
    themeToggle.addEventListener('change', function() {
        if (this.checked) {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        }
    });

    // 设置面板显示/隐藏
    settingsBtn.addEventListener('click', function() {
        settingsPanel.classList.toggle('show');
    });

    // 点击面板外部关闭面板
    document.addEventListener('click', function(event) {
        if (!settingsPanel.contains(event.target) && 
            !settingsBtn.contains(event.target)) {
            settingsPanel.classList.remove('show');
        }
    });
}); 