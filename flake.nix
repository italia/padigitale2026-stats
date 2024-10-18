{
  description = "Analytics data for https://areariservata.padigitale2026.gov.it/";

  inputs = {
    flake-utils.url = "github:numtide/flake-utils";
    nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";
  };

  outputs = { flake-utils, nixpkgs, self }:
    flake-utils.lib.eachDefaultSystem (system:
      let pkgs = import nixpkgs { inherit system; }; in
      {
        devShells.default = pkgs.mkShell {
          packages = [
            pkgs.deno
          ];
        };
        formatter = pkgs.nixpkgs-fmt;
      }
    );
}
