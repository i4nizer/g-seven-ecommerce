# g-seven-ecommerce
This is a team repository for a simple ecommerce system.

### naming conventions
- controllers: "ian.controller.js"
- models: "ian.model.js"
- casing: camelCase

### recommended styling for partials
> I recommend using **key** for templating duplicated partials like card.
```
<!-- HTML Template -->
<div class="card">
    <h5>Hello World</h5>
</div>
<!-- HTML Template -->

<!-- CSS -->
<% if (key == 0) { %>
<style>
#card {
    width: 100px;
    height: 40px;
}

#card h5 {
    width: 100%;
    height: fit-content;
    color: red;
}
</style>
<% } %>
<!-- CSS -->
```