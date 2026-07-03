const API_BASE = "/api";


export async function uploadHeadshot(file) {
    const form = new FormData();
    form.append("file", file);
    const res = await fetch(`${API_BASE}/upload-headshot`, {
        method: "POST",
        body: form,
    });
    if(!res.ok) {
        throw new Error("Failed to upload headshot");
    }
    return res.json();

}

export async function createjob({prompt, numThumbnails, headshotUrl}) {
    const res = await fetch(`${API_BASE}/create-job`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            prompt, 
            num_thumbnails: numThumbnails,
            headshot_url: headshotUrl
        }),
    });
    if(!res.ok) {
        throw new Error("Failed to create job");
    }
    return res.json();  
}