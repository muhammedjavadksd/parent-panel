// Demo data for testing order.php API
const demoOrderData = {
    // Customer Information
    firstName: "John",
    lastName: "Doe",
    phone: "+966-50-123-4567",
    email: "john.doe@example.com",

    // Company Information
    companyName: "ABC Company",
    country: "Saudi Arabia",
    state: "Riyadh Province",

    // Address Information
    streetAddress: "King Fahd Road, Building 123",
    apartment: "Suite 456",
    city: "Riyadh",
    zipCode: "12345",
    SECRET: "abc123",

    // Additional Information
    orderNotes: "Please deliver during business hours. Customer prefers morning delivery.",
    createAccount: true,

    // Cart Items
    cartItems: [
        {
            productId: "PROD001",
            productName: "Safety Helmet - Industrial Grade",
            productCategory: "Head Protection",
            quantity: 2,
            description: "High-quality industrial safety helmet with adjustable straps"
        },
        {
            productId: "PROD002",
            productName: "Safety Gloves - Cut Resistant",
            productCategory: "Hand Protection",
            quantity: 5,
            description: "Cut-resistant safety gloves, level 5 protection"
        }
    ],

    // Summary
    totalItems: 2,
    totalQuantity: 7,

    // Timestamp
    submittedAt: new Date().toISOString(),

    // Source
    source: "MultiSafety Website Test"
};

// Function to send order to API
async function sendOrderToAPI() {
    const apiUrl = 'https://multisafety.com.sa/images/order.php'; // Change this to your actual URL

    console.log('🚀 Sending order to API...');
    console.log('📧 API URL:', apiUrl);
    console.log('�� Order Data:', demoOrderData);

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(demoOrderData)
        });

        console.log('�� Response Status:', response.status);
        console.log('📡 Response Headers:', response.headers);

        const result = await response.json();

        console.log('📨 API Response:', result);

        if (result.success) {
            console.log('✅ SUCCESS! Order submitted successfully!');
            console.log('�� Order ID:', result.orderId);
            console.log('💬 Message:', result.message);
            console.log('📧 Email sent to: muhammedjavad119144@gmail.com');
        } else {
            console.log('❌ FAILED! Order submission failed!');
            console.log('💬 Error Message:', result.message);
            if (result.errors) {
                console.log('🔍 Validation Errors:', result.errors);
            }
        }

        return result;

    } catch (error) {
        console.log('❌ NETWORK ERROR!');
        console.log('🔍 Error Details:', error.message);
        console.log('💡 Possible causes:');
        console.log('   - API URL is incorrect');
        console.log('   - Server is not running');
        console.log('   - CORS is not enabled');
        console.log('   - Network connectivity issues');

        throw error;
    }
}


// Execute the test
console.log('🛒 MultiSafety Order API Test');
console.log('================================');

// Test 1: Send normal order
sendOrderToAPI()
    .then(result => {
        console.log('✅ Test 1 completed');

        // Test 2: Test with custom data
        // return testWithCustomData({
        //     firstName: 'Jane',
        //     lastName: 'Smith',
        //     email: 'jane.smith@example.com',
        //     orderNotes: 'Custom test order with different customer data'
        // });
    })
    .then(result => {
        console.log('✅ Test 2 completed');

        // Test 3: Test validation errors
        // return testValidationErrors();
    })
    .then(result => {
        console.log('✅ Test 3 completed');
        console.log('🎉 All tests completed!');
    })
    .catch(error => {
        console.log('❌ Test failed:', error);
    });

// Alternative: Simple one-time test
// Uncomment the line below to run just one test
// sendOrderToAPI();