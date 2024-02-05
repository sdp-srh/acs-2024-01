<script>

    import { initializeApp } from 'firebase/app'
    import { onAuthStateChanged, signInWithEmailAndPassword, getAuth, signOut,  createUserWithEmailAndPassword, sendEmailVerification  } from 'firebase/auth'
    const firebaseConfig = {
      apiKey: "AIzaSyD2TXO-mrUqFvjwmcc-a2HU6SKoNDdp_00",
      authDomain: "acs-2023-02.firebaseapp.com",
    }
    
  
    const fbApp = initializeApp(firebaseConfig)
    const fbAuth = getAuth(fbApp)
    // input data from the form
    let email = ''
    let password = ''
    // the result from the login
    let user = null
  
    const handleLogin = async () => {
      // check if success
  
      console.log('handleLogin')
      try {
        const loginResult = await signInWithEmailAndPassword(fbAuth, email, password)
        user = loginResult.user
        console.log(`User with email ${user.email} logged in`)

      } catch (err) {
        console.log(err)
        alert('Login failed')
        return
      }
  
    }
    const handleReset = () => {
      email = ''
      password = ''
    }

    onAuthStateChanged(fbAuth, (fbUser) => {
        if (fbUser) {
            user = fbUser;
        } else {
            user = null;
        }
    })  

    // register functionality
    /*
    let regName = ''
    let regEmail = ''
    let regPassword1 = ''
    let regPassword2 = ''
    let errorMessages = []
    let successText = ''
  
    const handleRegister = async () => {
      // check if success
      console.log('handleRegister')
      try {
        errorMessages = validateRegisterData()
        if (errorMessages.length === 0) {
          console.log('register user now')
          const registerResult = await createUserWithEmailAndPassword(fbAuth, regEmail, regPassword1)
          console.log('registerResult', registerResult)
          successText = 'Vielen Dank, sie haben sich erfoglreich angemeldet und eingeloggt'
          email = regEmail
          password = regPassword1
  
          const loginResult = await signInWithEmailAndPassword(fbAuth, regEmail, regPassword1)
          authUserStore.set(loginResult.user)
          const userInfo = await getReq(`/api/user`)
          const data = {
            name: regName,
            email: regEmail
          }
          await postReq(`/api/user/register/${APPID}`, data)
          // TODO NOW we have to save the name to the db (maybe in future addtional data via wizard)
          setTimeout(() => { successText = ''; handleLogin() }, 4000)
        }
        else {
          setTimeout(() => errorMessages = [], 10000)
        }
  
      } catch (err) {
        console.log(err)
        alert('Register failed')
        return
      }
    }
    
    const validateRegisterData = () => {
      const messages = []
      if (regName.length === 0) {
        messages.push('Name darf nicht leer sein')
      }
      if (regEmail.length === 0) {
        messages.push('Email darf nicht leer sein')
      }
      else {
        if (!isValidEmail(regEmail)) {
          messages.push('Email ist nicht gültig')
        }
      }
      if (regPassword1.length < 6) {
        messages.push(' Das Passwort muss mindestens 6 Zeichen lang sein')
      }
      if (regPassword1 !== regPassword2) {
        messages.push('Passwörter stimmen nicht überein')
      }
      return messages
  
    }
  
    const isValidEmail = (email) => {
      const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
      return regex.test(email)
    }
 
    const handleRegisterReset = () => {
      regName = ''
      regEmail = ''
      regPassword1 = ''
      regPassword2 = ''
    }
    */
  </script>
  
  <main>
    <div class="md:container md:mx-auto prose">
      <div class="h-screen flex items-center justify-center">
        
  
        <div role="tablist" class="tabs tabs-lifted">
          <!-- login tab -->
          <input type="radio" name="login_tabs" role="tab" class="tab" aria-label="Login" checked />
          <div role="tabpanel" class="tab-content bg-base-100 border-base-300 rounded-box p-6 rounded shadow-lg w-96">
            <h2>Login</h2>
            <div class="mb-4">
              <label class="label" for="email">Email</label>
              <input class="input input-bordered w-full" type="email" id="email" bind:value={email} placeholder="example@email.com" on:keydown={(e) => e.keyCode === 13 && handleLogin()} />
            </div>
            <div class="mb-4">
              <label class="label" for="password">Password</label>
              <input class="input input-bordered w-full" type="password" id="password" bind:value={password} on:keydown={(e) => e.keyCode === 13 && handleLogin()} />
            </div>
            <div class="flex justify-between items-center">
              <button class="btn btn-primary" on:click={handleLogin}>Login</button>
              <button class="btn" on:click={handleReset}>Reset</button>
            </div>
          </div>
          <input type="radio" name="login_tabs" role="tab" class="tab" aria-label="Register" />
          <div role="tabpanel" class="tab-content bg-base-100 border-base-300 rounded-box p-6 rounded shadow-lg w-96">
            <h2>Register</h2>
            <!--
            <div class="mb-4">
              <label class="label" for="email">Name</label>
              <input class="input input-bordered w-full" type="text" id="regName" bind:value={regName} />
            </div>
  
            <div class="mb-4">
              <label class="label" for="email">Email</label>
              <input class="input input-bordered w-full" type="email" id="regEmail" bind:value={regEmail} placeholder="example@email.com" on:keydown={(e) => e.keyCode === 13 && handleLogin()} />
            </div>
            <div class="mb-4">
              <label class="label" for="password">Password</label>
              <input class="input input-bordered w-full" type="password" id="regPassword1" bind:value={regPassword1} />
            </div>
            <div class="mb-4">
              <label class="label" for="password">Password wiederholen:</label>
              <input class="input input-bordered w-full" type="password" id="regPassword2" bind:value={regPassword2} />
            </div>
            <div class="flex justify-between items-center">
              <button class="btn btn-primary" on:click={handleRegister}>Registrieren</button>
              <button class="btn" on:click={handleRegisterReset}>Reset</button>
            </div>
            -->
          </div>
          
        </div>
      </div>
    </div>
    <!--
    {#if errorMessages.length > 0}
      <div class="toast toast-end">
        <div class="alert alert-error">
          {#each errorMessages as message}
            {message}<br/>
          {/each}
        </div>
      </div>
    {/if}
    {#if successText}
      <div class="toast toast-end">
        <div class="alert alert-success">
          {successText}
        </div>
      </div>
    {/if}
    -->
  
  </main>
  
  <style>
  </style>
  