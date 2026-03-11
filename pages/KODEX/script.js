        document.addEventListener('DOMContentLoaded', function () {
            const items = Array.from(document.querySelectorAll('.c8-item'));

            function closeContent(content, button) {
                content.setAttribute('aria-hidden', 'true');
                content.style.maxHeight = '0';
                content.classList.remove('open');
                if (button) button.setAttribute('aria-expanded', 'false');
            }

            function openContent(content, button) {
                content.setAttribute('aria-hidden', 'false');
                content.style.maxHeight = content.scrollHeight + 'px';
                content.classList.add('open');
                if (button) button.setAttribute('aria-expanded', 'true');
            }

            function closeAll() {
                items.forEach(function (it) {
                    const content = it.querySelector('.c8-subcontent');
                    const btn = it.querySelector('.c8-subbutton');
                    closeContent(content, btn);
                });
            }

            items.forEach(function (it) {
                const btn = it.querySelector('.c8-subbutton');
                const content = it.querySelector('.c8-subcontent');
                if (!btn || !content) return;

                btn.addEventListener('click', function () {
                    const isOpen = btn.getAttribute('aria-expanded') === 'true';
                    if (isOpen) {
                        closeContent(content, btn);
                    } else {
                        closeAll();
                        openContent(content, btn);
                    }
                });

                content.addEventListener('transitionend', function () {
                    if (!content.classList.contains('open')) {
                        content.style.maxHeight = '0';
                    }
                });
            });
        });