
    
        // Mobile Navigation Toggle
        const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
        const navLinks = document.querySelector('.nav-links');

        mobileNavToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileNavToggle.innerHTML = navLinks.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });

        // Cart Functionality
        const cartBtn = document.querySelector('.cart-btn');
        const cartOverlay = document.querySelector('.cart-overlay');
        const cart = document.querySelector('.cart');
        const closeCart = document.querySelector('.close-cart');
        const cartCount = document.querySelector('.cart-count');
        const cartItems = document.querySelector('.cart-items');
        const cartTotal = document.querySelector('.cart-total-amount');
        const checkoutBtn = document.querySelector('.checkout-btn');
        
        // Sample products data
        const products = {
            'flora-silk-blouse': {
                id: 'flora-silk-blouse',
                title: 'Flora Silk Blouse',
                price: 79.99,
                image: 'https://placehold.co/500x500',
                quantity: 1
            },
            'voyager-crossbody-bag': {
                id: 'voyager-crossbody-bag',
                title: 'Voyager Crossbody Bag',
                price: 129.99,
                image: 'https://placehold.co/500x500',
                quantity: 1
            },
            'celestial-statement-necklace': {
                id: 'celestial-statement-necklace',
                title: 'Celestial Statement Necklace',
                price: 59.99,
                image: 'https://placehold.co/500x500',
                quantity: 1
            },
            'classic-dress-shirt': {
                id: 'classic-dress-shirt',
                title: 'Classic Dress Shirt',
                price: 49.99,
                image: 'https://placehold.co/500x500',
                quantity: 1
            }
        };

        let cartItemsData = {};

        // Toggle Cart
        function toggleCart() {
            cartOverlay.classList.toggle('active');
            cart.classList.toggle('active');
            if (cart.classList.contains('active')) {
                updateCartUI();
            }
        }

        cartBtn.addEventListener('click', toggleCart);
        cartOverlay.addEventListener('click', toggleCart);
        closeCart.addEventListener('click', toggleCart);

        // Add to Cart
        function addToCart(productId) {
            if (cartItemsData[productId]) {
                cartItemsData[productId].quantity += 1;
            } else {
                cartItemsData[productId] = {...products[productId]};
            }
            updateCartCount();
            updateCartUI();
        }

        // Remove from Cart
        function removeFromCart(productId) {
            if (cartItemsData[productId]) {
                delete cartItemsData[productId];
                updateCartCount();
                updateCartUI();
            }
        }

        // Update Cart Count
        function updateCartCount() {
            let count = 0;
            for (const item in cartItemsData) {
                count += cartItemsData[item].quantity;
            }
            cartCount.textContent = count;
        }

        // Update Cart UI
        function updateCartUI() {
            if (Object.keys(cartItemsData).length === 0) {
                cartItems.innerHTML = '<div class="empty-cart-message">Your cart is empty</div>';
                cartTotal.textContent = '$0.00';
                checkoutBtn.disabled = true;
                return;
            }

            let itemsHTML = '';
            let total = 0;
            
            for (const item in cartItemsData) {
                const product = cartItemsData[item];
                const itemTotal = product.price * product.quantity;
                total += itemTotal;
                
                itemsHTML += `
                    <div class="cart-item">
                        <img src="${product.image}" alt="${product.title}" class="cart-item-image">
                        <div class="cart-item-info">
                            <h4 class="cart-item-title">${product.title}</h4>
                            <p class="cart-item-price">$${product.price.toFixed(2)}</p>
                            <button class="remove-item" data-id="${product.id}">Remove</button>
                        </div>
                    </div>
                `;
            }
            
            cartItems.innerHTML = itemsHTML;
            cartTotal.textContent = `$${total.toFixed(2)}`;
            checkoutBtn.disabled = false;
            
            // Add event listeners to remove buttons
            document.querySelectorAll('.remove-item').forEach(button => {
                button.addEventListener('click', (e) => {
                    removeFromCart(e.target.dataset.id);
                });
            });
        }

        // Checkout
        checkoutBtn.addEventListener('click', () => {
            alert('Proceeding to checkout with ' + cartCount.textContent + ' items');
            // In a real app, you would redirect to a checkout page
        });

        // Add event listeners to all Add to Cart buttons
        document.querySelectorAll('.btn-primary').forEach(button => {
            if (button.textContent === 'Add to Cart') {
                button.addEventListener('click', (e) => {
                    const productCard = e.target.closest('.product-card');
                    const productId = productCard.querySelector('.product-title').textContent
                        .toLowerCase().replace(/\s+/g, '-');
                    addToCart(productId);
                    
                    // Visual feedback
                    const originalText = button.textContent;
                    button.textContent = 'Added!';
                    button.style.backgroundColor = '#28a745';
                    
                    setTimeout(() => {
                        button.textContent = originalText;
                        button.style.backgroundColor = '';
                    }, 1000);
                });
            }
        });

        // Close cart when clicking outside
        cartOverlay.addEventListener('click', toggleCart);
    