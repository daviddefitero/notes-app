const API_ENDPOINT = import.meta.env.VITE_API_URL

export async function getAll () {
    const response = await fetch(API_ENDPOINT)
    if (!response.ok) throw new Error('Failed connecting with server')
    return await response.json()
}

export async function create (noteObject) {
    const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        body: JSON.stringify(noteObject),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    if (!response.ok) throw new Error('Failed connecting with server')
    return await response.json()
}

export async function update (id, noteObject) {
    const response = await fetch(`${API_ENDPOINT}/${id}`, {
        method: 'PUT',
        body: JSON.stringify(noteObject),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    if (!response.ok) throw new Error('Failed connecting with server')
    return await response.json()
}

export async function remove (id) {
    const response = await fetch(`${API_ENDPOINT}/${id}`,
        { method: 'DELETE' }
    )
    if (!response.ok) throw new Error('Failed connecting with server')
    return await response.json()
}