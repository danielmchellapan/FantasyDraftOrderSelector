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
