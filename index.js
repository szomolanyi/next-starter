const next = require('next')

//create next app
const dev = process.env.NODE_ENV !== 'production'
const next_app = next({ dev })
const handle = next_app.getRequestHandler()

next_app.prepare()
  
  .then(() => {
    const app = require('server')

    app.get('*', (req, res) => {
      //console.log({msg:"nexthadle", r:req.cookies, usr:req.user, })
      return handle(req, res)
    })

    app.listen(3000, (err) => {
      if (err) throw err
      console.log('> Ready on http://localhost:3000')
    })
  })
  .catch((ex) => {
    console.error(ex.stack)
    process.exit(1)
  })
