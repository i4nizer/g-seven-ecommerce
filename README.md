# g-seven-ecommerce
This is a team repository for a simple ecommerce system.

### naming conventions
- controllers: "ian.controller.js"
- models: "ian.model.js"

### partials styling
> We will use vue style for files inside partials directory. (template-script-style)
`
<!-- HTML Template -->
<header id="header">
    <h5>Hello World</h5>
</header>
<!-- HTML Template -->

<!-- Javascript -->
<script>
/**
 * NOTE:
 *      You can exclude this javascript part as this will cause 
 *      an ERROR with REPLICATED variables and functions.
 */
</script>
<!-- Javascript -->

<!-- CSS -->
<style>
/**
 * NOTE:
 *      Use IDs (id="header") on the root/parent element
 *      which in this case is the header so that you can
 *      target that part without conflic with other files.
 */
#header {
    width: 100px;
    height: 40px;
}

#header h5 {
    width: 100%;
    height: fit-content;
    color: red;
}
</style>
<!-- CSS -->
`