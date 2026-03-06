## docker
### Arch Linux
`container_name` is  not correctly used  in Arch Linux, `docker ps` is showing a hash instead of the container name.

## php build dependencies
### re2c
#### Arch Installation

```bash
sudo pacman -S re2c
```
#### Ubuntu Installation
already installed ?

### postgresql-libs
#### Arch Installation
```bash
sudo pacman -S postgresql-libs
```
#### Ubuntu Installation
already installed ?
### libzip
#### Arch Installation
```bash
sudo pacman -S libzip
```
#### Ubuntu Installation
already installed ?

## asdf
[Install asdf](https://asdf-vm.com/guide/getting-started.html#_1-install-asdf)

### nodejs vm plugin
```bash
asdf plugin add nodejs https://github.com/asdf-vm/asdf-nodejs.git
```

### php vm plugin
This plugin has host dependencies that need to be installed before use.
- Arch Linux:
  - re2c
  - postgresql-libs 
  - libzip

```bash
asdf plugin-add php https://github.com/asdf-community/asdf-php.git
```

## build javascript application

`npm run build:laravel` is using host php runtime
```bash
npm ci
npm run docker
docker exec 5941d797ddbb composer setup

npm run build:internal-dependencies
npm run build:laravel
```
when first accessing appearance localStorage and cookies are set to `system` values and need to be reset to `light` values
## jq

## crudini
### Ubuntu Installation
```bash
sudo apt install crudini
```

### Arch Installation
```bash
yay python-iniparse-git
yay crudini
```
