// Connect to the database server.

// Connection URI.
const connStr = "postgresql://" + process.env.PSQLU + ":" + process.env.PSQLW + "@192.168.1.90:5432/weight"

module.exports = {
	connectionString: connStr
}
