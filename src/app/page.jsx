import Link from "next/link"

const page = () => {


  return (
    <div>
      <h1>Accueil</h1>
      <Link href="/login">
        Se connecter
      </Link>
    </div>
  )
}

export default page
