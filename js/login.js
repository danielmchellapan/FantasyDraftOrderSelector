async function loginUser(credentials) 
{
    try 
    {
        const response = await fetch("/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(credentials)
        }); 

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Login successful:", data);
    } 
    catch (error) 
    {
        console.error("Error during login:", error);
    }
}

document.getElementById("loginForm").addEventListener("submit", async (event) => {
    // 1. Prevent the default form submission (page reload)
    event.preventDefault();

    // 2. Collect data from the input fields
    const username = event.target.username.value;
    const password = event.target.password.value;

    // 3. Call your async function
    await loginUser({ username, password });
});
