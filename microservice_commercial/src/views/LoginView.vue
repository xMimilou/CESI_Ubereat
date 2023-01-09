<template>
    <div class="container">
        <div class="box">
            <form class="">
            
                <h3>Se connecter</h3>
            
                <div class="form-group">
                    <label>Email</label>
                    <input
                    type="email"
                    class="form-control"
                    placeholder="Email"
                    />
                </div>
            
                <div class="form-group">
                    <label>Mot de passe</label>
                    <input
                    type="password"
                    class="form-control"
                    placeholder="Mot de passe"
                    />
                </div>
            
                <button class="btn btn-primary btn-block">Se connecter</button>
            
                <p class="forgot-password text-right">
                    <router-link to="forgot">Mot de passe oublié ?</router-link>
                </p>
            </form>
        </div>
    </div>
</template>
  
<style>
.container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: calc(100vh - 50px);
}
.box {
    background: rgb(255, 255, 255);
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    padding: 20px;
    width: 400px;
}
.form-group {
    margin-bottom: 1rem;
    width: 100%;
}
.form-control {
    border: 1px solid #ced4da;
    border-radius: 5px;
    padding: 0.5rem 1rem;
    width: 100%;
}
h3{
    text-align: center;
    margin-bottom: 1rem;
    color : hsla(160, 100%, 37%, 1);
}
.btn {
    background: hsla(160, 100%, 37%, 1);
    color: white;
    border: none;
    border-radius: 5px;
    padding: 0.5rem 1rem;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s ease;
    text-align: center;
    /* align item center of the line */
    display: flex;
    justify-content: center;
    align-items: center;
    /* align table center */
    margin-left: auto;
    margin-right: auto;
    /* display grid border */
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
</style>


<script lang="ts">
</script>