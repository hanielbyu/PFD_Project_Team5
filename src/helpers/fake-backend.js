export { fakeBackend };

function fakeBackend() {
    let users = [
        {
            id: 1, 
            username: 'tech', 
            password: 'tech', 
            firstName: 'Tommy', 
            lastName: 'Tan',
            role: 'tech'
        },
        {
            id: 2, 
            username: 'user', 
            password: 'user', 
            firstName: 'Alice', 
            lastName: 'Tan',
            role: 'user'
        }
    ];

    let realFetch = window.fetch;
    window.fetch = function (url, opts) {
        return new Promise((resolve, reject) => {
            // wrap in timeout to simulate server api call
            setTimeout(handleRoute, 500);

            function handleRoute() {
                switch (true) {
                    case url.endsWith('/users/authenticate') && opts.method === 'POST':
                        return authenticate();
                    case url.endsWith('/users') && opts.method === 'GET':
                        return getUsers();
                    default:
                        // pass through any requests not handled above
                        return realFetch(url, opts)
                            .then(response => resolve(response))
                            .catch(error => reject(error));
                }
            }

            // route functions

            async function authenticate() {
                const { username, password } = body();

                const requestOptions = {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ 
                      username: username,
                      password: password,
                     })
                };
                const response = await fetch("http://localhost:5000/login", requestOptions);
                const data = await response.json();
                const user = data.user;
                console.log("user this: ", user);
                

                // const user = users.find(x => x.username === username && x.password === password);

                if (data.status == 'ERROR') return error('Username or password is incorrect');

                return ok({
                    id: user.id,
                    username: user.username,
                    role: user.role,
                    token: 'fake-jwt-token'
                });
            }

            function getUsers() {
                if (!isAuthenticated()) return unauthorized();
                return ok(users);
            }

            // helper functions

            function ok(body) {
                resolve({ ok: true, text: () => Promise.resolve(JSON.stringify(body)) })
            }

            function unauthorized() {
                resolve({ status: 401, text: () => Promise.resolve(JSON.stringify({ message: 'Unauthorized' })) })
            }

            function error(message) {
                resolve({ status: 400, text: () => Promise.resolve(JSON.stringify({ message })) })
            }

            function isAuthenticated() {
                return opts.headers['Authorization'] === 'Bearer fake-jwt-token';
            }

            function body() {
                return opts.body && JSON.parse(opts.body);
            }
        });
    }
}
