
// DELETE

async function deleteRecetas(collection, callback){
    try {
        const doc = {$or:[{nombre:"Estados Unidos"}, {nombre:"Chile"}]}
        const result = await collection.deleteMany(doc)
        console.log(result)
    } finally {
        await callback()
    }
}

module.exports = deleteRecetas