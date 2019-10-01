

// Weight routes
app.route("/api/weight")
	.get(weight.getList)
	.post(weight.postWeight)
