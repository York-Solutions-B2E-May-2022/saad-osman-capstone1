export function addProcess(list) {
    console.log(list)
    return async function sideEffect(dispatch) {
        try {
            const response = await fetch("http://localhost:8080/here", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json', // willing to accept
                    'Content-Type': 'application/json' //defining what we are sending
                },
                body: JSON.stringify(list)

            })
            const data = await response.json();
            console.log(data);
        } catch (e) {
        }
    }
}
