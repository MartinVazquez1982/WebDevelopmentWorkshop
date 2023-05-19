
// DELETE

async function deleteRecetas(model, callback){
    try {
        const doc = {$or:[{nombre:"Estados Unidos"}, {nombre:"Chile"}]}
        const result = await model.deleteMany(doc)
        console.log(result)
    } finally {
        await callback()
    }
}

module.exports = deleteRecetas