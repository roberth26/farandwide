[Visit Site](http://node-env.eba-2fksixhq.us-west-1.elasticbeanstalk.com/)

# Development & Deployment Instructions

(only for MacOS)

### 1) install brew

```
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

### 2) install deps

```
brew install git nvm
```

### 3) install eb-cli deps:

```
brew install zlib openssl readline
CFLAGS="-I$(brew --prefix openssl)/include -I$(brew --prefix readline)/include -I$(xcrun --show-sdk-path)/usr/include" LDFLAGS="-L$(brew --prefix openssl)/lib -L$(brew --prefix readline)/lib -L$(brew --prefix zlib)/lib"
```

### 4) Clone EB CLI Installation Instructions

```
git clone https://github.com/aws/aws-elastic-beanstalk-cli-setup.git
```

Run it and follow the instructions

```
./aws-elastic-beanstalk-cli-setup/scripts/bundled_installer
```

### 5) Setup SSH Key for Robert's repo TODO:

### 6) Clone farandwide repo TODO:

```
git clone https://github.com/roberth26/farandwide.git
```

### 7) Install VSCode for editing

```
brew cask install visual-studio-code
```

```
code --install-extension esbenp.prettier-vscode
```

```
cd farandwide
```

```
code .
```

### 8) start dev server

```
npm run start
```

### 9) Deployment TODO:
