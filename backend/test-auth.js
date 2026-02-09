try {
    console.log("Importing auth.js...");
    await import('./routes/auth.js');
    console.log("Import success!");
} catch (e) {
    console.error("Import failed:", e);
}
