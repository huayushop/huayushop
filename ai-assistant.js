// AI助手相关的所有JavaScript函数
function toggleChat() {
    const aiAssistant = document.querySelector('.ai-assistant');
    const chatBody = document.getElementById('chat-body');
    const toggleIcon = document.getElementById('toggle-icon');
    
    aiAssistant.classList.toggle('collapsed');
    chatBody.classList.toggle('collapsed');
    
    if (aiAssistant.classList.contains('collapsed')) {
        toggleIcon.textContent = 'AI';
    } else {
        toggleIcon.textContent = '△';
    }
}

// 拖动相关变量和函数
let isDragging = false;
let currentX = 0;
let currentY = 0;
let initialX = 0;
let initialY = 0;
let xOffset = 0;
let yOffset = 0;

function initAIAssistant() {
    const aiAssistant = document.querySelector('.ai-assistant');
    const chatHeader = document.querySelector('.chat-header');

    function dragStart(e) {
        initialX = e.clientX - xOffset;
        initialY = e.clientY - yOffset;

        if (e.target.closest('.chat-header')) {
            isDragging = true;
        }
    }

    function dragEnd() {
        initialX = currentX;
        initialY = currentY;
        isDragging = false;
    }

    function drag(e) {
        if (isDragging) {
            e.preventDefault();
            currentX = e.clientX - initialX;
            currentY = e.clientY - initialY;
            xOffset = currentX;
            yOffset = currentY;

            aiAssistant.style.left = (aiAssistant.offsetLeft + xOffset) + 'px';
            aiAssistant.style.top = (aiAssistant.offsetTop + yOffset) + 'px';
            initialX = e.clientX;
            initialY = e.clientY;
        }
    }

    chatHeader.addEventListener('mousedown', dragStart);
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', dragEnd);
}

// 消息发送相关函数
async function sendMessage() {
    // ... 复制index.html中的sendMessage函数代码 ...
}

// 初始化
document.addEventListener('DOMContentLoaded', function() {
    initAIAssistant();
    
    // 监听回车键发送消息
    document.getElementById('user-input').addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });
}); 