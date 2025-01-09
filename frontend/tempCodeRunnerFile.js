app.get('/test-image', (req, res) => {
    const sampleFile = path.join(bookPath, 'coverfile-1732630148885-99462299.png'); // Replace with your file name
    res.sendFile(sampleFile); // Send the file directly to the client
});