#!/bin/bash

# @author Artem Lytvynov
# @copyright Artem Lytvynov
# @license Apache-2.0

if [ ! -f ./.ssh/gh ]; then
  echo "Warning: SSH keys not found. Running keys generator."
  echo "Please, use [./.ssh/gh] as a keys file."
  rm -rf ./.ssh
  mkdir ./.ssh
  ssh-keygen -t ed25519 -C "hdml.github@gmail.com"
fi

git config core.sshCommand "$(which ssh) -i ./.ssh/gh"
git config user.name "hdml"
git config user.email "hdml.github@gmail.com"