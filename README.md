# Giveth Garden Interface :leaves: :purple_heart:

### Forked from [1Hive Honey Pot](https://github.com/1Hive/honey-pot)
### Karma template frontend using @aragon/connect.

How to run locally:

#### Clone the repository
```
git clone https://github.com/Giveth/garden-interface.git
```

#### Install dependencies
```
cd garden-interface
yarn --ignore-engines
```

#### Start UI
```
yarn start:[network]

# yarn start:rinkeby
# yarn start:xdai
```

### Environment variables


```
REACT_APP_APP_NAME # Name of the app (if empty, defaults to conviction-voting)
REACT_APP_ORG_ADDRESS # Address of the organization (if empty, defaults to address specified in netowrks.js file)
```
