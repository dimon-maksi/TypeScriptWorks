// Interface for Product
interface Product {
    name: string;
    price: number;
    available: boolean;
}

// Product constructor function
class Product implements Product {
    constructor(
        public name: string,
        public price: number,
        public available: boolean
    ) {}
}

// Inventory array to store products
const inventory: Product[] = [
    new Product("Laptop", 1200, true),
    new Product("Smartphone", 800, true),
    new Product("Tablet", 450, false),
    new Product("Headphones", 150, true),
    new Product("Keyboard", 100, true)
];

// Shopping cart array
let shoppingCart: Product[] = [];

// Function to display all products in inventory
function displayInventory(): void {
    let output: string = "Product Inventory:<br>";
    inventory.forEach((product, index) => {
        output += `${index + 1}. ${product.name} - $${product.price} - Available: ${product.available}<br>`;
    });
    document.getElementById('output')!.innerHTML = output;
}

// Function to add product to the cart
function addToCart(productName: string): void {
    const product = inventory.find(item => item.name === productName);
    if (product && product.available) {
        shoppingCart.push(product);
        document.getElementById('output')!.innerHTML = `${product.name} added to cart.`;
    } else {
        document.getElementById('output')!.innerHTML = `Sorry, ${productName} is not available.`;
    }
}

// Function to remove product from the cart
function removeFromCart(productName: string): void {
    shoppingCart = shoppingCart.filter(item => item.name !== productName);
    document.getElementById('output')!.innerHTML = `${productName} removed from cart.`;
}

// Function to calculate total price of items in the cart
function calculateTotal(): number {
    let total: number = 0;
    shoppingCart.forEach(product => {
        total += product.price;
    });
    return total;
}

// Function to apply discount based on conditions (e.g., total price > $1000)
function applyDiscount(total: number): number {
    const discountRate: number = 0.1; // 10% discount
    if (total > 1000) {
        return total - (total * discountRate);
    }
    return total;
}

// Function to checkout
function checkout(): void {
    if (shoppingCart.length === 0) {
        document.getElementById('output')!.innerHTML = "Your cart is empty!";
        return;
    }

    let total: number = calculateTotal();
    let output: string = `Total before discount: $${total}<br>`;

    total = applyDiscount(total);
    output += `Total after discount (if applicable): $${total}<br>`;

    output += "Checkout complete. Thank you for your purchase!";
    document.getElementById('output')!.innerHTML = output;

    shoppingCart = []; // Clear the cart after checkout
}

// Function to display the current cart
function displayCart(): void {
    if (shoppingCart.length === 0) {
        document.getElementById('output')!.innerHTML = "Your cart is empty!";
        return;
    }

    let output: string = "Current Shopping Cart:<br>";
    shoppingCart.forEach((product, index) => {
        output += `${index + 1}. ${product.name} - $${product.price}<br>`;
    });
    document.getElementById('output')!.innerHTML = output;
}

// Event listeners for buttons
document.getElementById('displayInventoryBtn')!.addEventListener('click', displayInventory);
document.getElementById('addToCartBtn')!.addEventListener('click', () => addToCart("Laptop"));
document.getElementById('removeFromCartBtn')!.addEventListener('click', () => removeFromCart("Laptop"));
document.getElementById('displayCartBtn')!.addEventListener('click', displayCart);
document.getElementById('checkoutBtn')!.addEventListener('click', checkout);

// Initial display
document.getElementById('output')!.innerHTML = "Use the buttons above to interact with the system.";
