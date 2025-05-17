export default function Footer() {
  return (
    <div className="flex flex-col sm:items-center items-start bg-emerald-600 pt-12 pb-10 gap-6 p-8">
      <div className="flex gap-10 items-center">
        <img className="h-24 hidden sm:block" src="graysoccer4change.png"></img>
        <div className="text-white flex flex-col gap-2">
          <h3 className="uppercase font-semibold tracking-wider text-xl">
            Contact
          </h3>
          <div>
            <p>contactsoccerforchange@gmail.com</p>
            <p>(206)-823-4334</p>
            <p>Bellevue, WA</p>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-4 sm:justify-center text-white">
        <p className="sm:text-center">
          © 2024 Soccer for Change, a 501(c)(3) nonprofit. All rights reserved.
        </p>
        <a className="hover:underline" href="/privacy">
          Privacy Policy
        </a>
      </div>
      <img
        className="h-16 object-contain sm:hidden"
        src="graysoccer4change.png"
      ></img>
    </div>
  );
}
