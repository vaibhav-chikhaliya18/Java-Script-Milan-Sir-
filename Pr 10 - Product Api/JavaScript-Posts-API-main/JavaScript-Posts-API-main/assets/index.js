fetch('https://dummyjson.com/posts')
        .then(data => data.json())
        .then((record) => {
            console.log(record.users);
            let tbl = "";
            record.posts.map((val) => {
                return (
                    tbl += `
                    <div class = "col-3 ">
                        <div class="card mb-4">
                            <div class="card-body">
                                <h5 class="card-title">${val.id}</h5>
                                <h6 class="card-subtitle mb-2 text-muted">${val.title} </h6>
                                <p class="card-texts">${val.body}</p>
                                <p class="card-text">UserId :- ${val.userId}</p>
                                <p class="card-text">Tags :- ${val.tags}</p>
                                <p class="card-text">Reactions :- ${val.reactions}</p>
                            </div>
                        </div>
                    </div>
            `
                )
            })
            document.getElementById('details').innerHTML = tbl;
        })