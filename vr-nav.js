// VR/AR 导航与交互效果

// 当文档加载完成时执行
document.addEventListener('DOMContentLoaded', function() {
    // 初始化3D变换效果
    init3DTransform();
    
    // 初始化全息按钮
    initHologramButtons();
    
    // 初始化导航菜单
    initNavigation();
    
    // 添加全局网格和扫描线
    addVROverlays();
    
    // 添加浮动元素动画
    initFloatingElements();
    
    // 初始化工具提示
    initTooltips();
});

// 初始化3D变换效果
function init3DTransform() {
    document.querySelectorAll('.card-3d').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const angleX = (y - centerY) / 20;
            const angleY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) translateZ(10px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        });
    });
}

// 初始化全息按钮
function initHologramButtons() {
    document.querySelectorAll('.hologram-button').forEach(button => {
        button.addEventListener('click', () => {
            button.style.transform = 'scale(0.95)';
            setTimeout(() => button.style.transform = '', 100);
            
            // 创建波纹效果
            createRippleEffect(button);
        });
    });
}

// 创建波纹效果
function createRippleEffect(element) {
    const ripple = document.createElement('span');
    ripple.classList.add('ripple');
    element.appendChild(ripple);
    
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${-size/2 + rect.width/2}px`;
    ripple.style.top = `${-size/2 + rect.height/2}px`;
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// 初始化导航菜单
function initNavigation() {
    // 检查是否已存在导航栏
    if (!document.querySelector('.vr-nav-bar')) {
        createNavBar();
    }
    
    // 给导航项添加点击事件
    document.querySelectorAll('.vr-nav-item').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const target = item.getAttribute('data-target');
            if (target) {
                window.location.href = target;
            }
        });
    });
}

// 创建导航栏
function createNavBar() {
    const navBar = document.createElement('div');
    navBar.className = 'vr-nav-bar glass-card';
    
    const pages = [
        { name: '首页', icon: 'fa-home', target: 'index.html' },
        { name: '数据', icon: 'fa-chart-bar', target: 'home.html' },
        { name: '空间', icon: 'fa-cube', target: 'space.html' },
        { name: '健康', icon: 'fa-heartbeat', target: 'health.html' },
        { name: '物品', icon: 'fa-box', target: 'items.html' },
        { name: '设置', icon: 'fa-cog', target: 'profile.html' },
        { name: '预览', icon: 'fa-eye', target: 'preview.html' },
        { name: '总结', icon: 'fa-project-diagram', target: 'summary.html' },
        { name: '全景', icon: 'fa-columns', target: 'overview.html' }
    ];
    
    // 获取当前页面文件名
    const currentPage = window.location.pathname.split('/').pop();
    
    pages.forEach(page => {
        const isActive = currentPage === page.target;
        const navItem = document.createElement('div');
        navItem.className = `vr-nav-item ${isActive ? 'active' : ''}`;
        navItem.setAttribute('data-target', page.target);
        
        navItem.innerHTML = `
            <i class="fas ${page.icon}"></i>
            <span>${page.name}</span>
        `;
        
        navBar.appendChild(navItem);
    });
    
    // 添加到页面
    document.body.appendChild(navBar);
}

// 添加VR覆盖层
function addVROverlays() {
    // 检查是否已存在网格覆盖层
    if (!document.querySelector('.grid-overlay')) {
        const gridOverlay = document.createElement('div');
        gridOverlay.className = 'grid-overlay';
        document.body.prepend(gridOverlay);
    }
    
    // 检查是否已存在扫描线
    if (!document.querySelector('.scan-line')) {
        const scanLine = document.createElement('div');
        scanLine.className = 'scan-line';
        document.body.appendChild(scanLine);
    }
}

// 初始化浮动元素
function initFloatingElements() {
    document.querySelectorAll('.floating').forEach((element, index) => {
        // 为每个元素添加不同的延迟，使动画错开
        element.style.animationDelay = `${index * 0.5}s`;
    });
}

// 初始化工具提示
function initTooltips() {
    document.querySelectorAll('.has-tooltip').forEach(element => {
        const tooltipText = element.getAttribute('data-tooltip');
        if (tooltipText) {
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = tooltipText;
            
            element.parentNode.insertBefore(tooltip, element.nextSibling);
            
            element.addEventListener('mousemove', (e) => {
                tooltip.style.left = `${e.clientX}px`;
                tooltip.style.top = `${e.clientY - 30}px`;
            });
        }
    });
}

// 添加3D物体标记
function add3DMarker(x, y, label) {
    const marker = document.createElement('div');
    marker.className = 'object-marker';
    marker.style.left = `${x}%`;
    marker.style.top = `${y}%`;
    
    if (label) {
        const markerLabel = document.createElement('div');
        markerLabel.className = 'vr-tooltip';
        markerLabel.textContent = label;
        marker.appendChild(markerLabel);
    }
    
    document.body.appendChild(marker);
    return marker;
}

// 添加风险区域标记
function addRiskZone(x, y, size, level = 'medium') {
    const zone = document.createElement('div');
    zone.className = 'risk-zone';
    zone.style.left = `${x}%`;
    zone.style.top = `${y}%`;
    zone.style.width = `${size}px`;
    zone.style.height = `${size}px`;
    
    // 根据风险级别设置颜色
    if (level === 'high') {
        zone.style.borderColor = 'rgba(255, 69, 58, 0.7)';
        zone.style.background = 'rgba(255, 69, 58, 0.2)';
    } else if (level === 'low') {
        zone.style.borderColor = 'rgba(48, 209, 88, 0.7)';
        zone.style.background = 'rgba(48, 209, 88, 0.2)';
    }
    
    document.body.appendChild(zone);
    return zone;
}

// 创建数据更新效果
function updateDataWithEffect(element, newValue, duration = 1000) {
    const startValue = parseFloat(element.textContent);
    const endValue = parseFloat(newValue);
    const startTime = performance.now();
    
    function updateValue(timestamp) {
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // 使用缓动函数使动画更平滑
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        
        const currentValue = startValue + (endValue - startValue) * easeProgress;
        element.textContent = currentValue.toFixed(1);
        
        if (progress < 1) {
            requestAnimationFrame(updateValue);
        } else {
            element.textContent = newValue;
            
            // 添加更新完成的闪光效果
            element.classList.add('data-updated');
            setTimeout(() => {
                element.classList.remove('data-updated');
            }, 500);
        }
    }
    
    requestAnimationFrame(updateValue);
}

// 全局事件监听 - 用于手势控制
document.addEventListener('keydown', (e) => {
    // 按下空格键进入VR模式
    if (e.code === 'Space') {
        toggleVRMode();
    }
});

// 切换VR模式
function toggleVRMode() {
    document.body.classList.toggle('vr-mode');
    
    if (document.body.classList.contains('vr-mode')) {
        enterVRMode();
    } else {
        exitVRMode();
    }
}

// 进入VR模式
function enterVRMode() {
    // 这里可以添加进入VR模式的逻辑
    console.log('已进入VR模式');
}

// 退出VR模式
function exitVRMode() {
    // 这里可以添加退出VR模式的逻辑
    console.log('已退出VR模式');
} 