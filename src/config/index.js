const url_image = 'https://hr-app-server.irvinfiz.now.sh/image-upload';
const opts_image = {
    method: "POST"
};
                      
const hr_server = 'https://hr-app-server.adrian-injection.vercel.app/graph';
// const hr_server = 'http://localhost:4001/graph';

// const url = 'https://injection.adrian-injection.vercel.app/injection';
const url = 'http://localhost:4000/injection'

const opts = {
    method: "POST",
    headers: { "Content-Type": "application/json" }
};

const hr_opts = {
    method: "POST",
    headers: { "Content-Type": "application/json" }
};

export { url, opts, url_image, opts_image, hr_server, hr_opts }