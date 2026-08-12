const AppFooter = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border/60 bg-background/80">
      <div className="flex min-h-16 flex-col items-center justify-between gap-3 px-6 py-4 text-sm text-muted-foreground sm:flex-row">

        {/* Copyright */}
        <p className="transition-colors duration-200 hover:text-foreground">
          © {year}{" "}
          <span className="font-semibold text-foreground transition-colors duration-200 hover:text-primary">
            CampusIQ
          </span>
          . All rights reserved.
        </p>

        {/* Center */}
        <p className="group cursor-default text-center transition-colors duration-200 hover:text-primary">
          <span className="inline-block transition-transform duration-300 group-hover:-translate-y-0.5">
            Campus AI Management System
          </span>
        </p>

        {/* Right */}
        <p className="group cursor-default text-center transition-colors duration-200 hover:text-foreground">
          <span className="transition-colors duration-200 group-hover:text-primary">
            Smart Campus
          </span>
          <span className="mx-1 opacity-50">•</span>
          <span className="transition-colors duration-200 group-hover:text-primary">
            Smarter Management
          </span>
        </p>

      </div>
    </footer>
  );
};

export default AppFooter;