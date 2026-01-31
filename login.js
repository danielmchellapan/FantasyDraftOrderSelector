fetch("/login")
    .then(response => {
        if (!response.ok) throw new Error("Network error");
        return response.json();
})
.then(data => console.log("Login successful:", data))
.catch(error => console.error("Error:", error));

async function getData() 
{
    try
    {
        const response = await(fetch("/login"));
        if (!response.ok) 
        {
            throw new Error("Network response was not ok");
        
        }
        const data = await response.json();
        console.log("Login successful:", data);
    }
    catch (error) 
    {
        console.error("Error:", error);
    }
  
}