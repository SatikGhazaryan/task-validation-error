/**
 * Satik 2022
 *
 * input  Validation
 *
 * * */

class SignupValidation {
  errors = [];
  validCount = 0;
  userNameError = false;

  checkName(nam) {
    return nam;
  }
  checkSurname(surname) {
    return surname;
  }
  checkUsername(username) {
    let arr = username.match(/[a-z]/g);
    let p = document.createElement("p");
    let pArr = document.querySelectorAll(".user p");
    p.innerHTML = "Username must contain lowercase English letters";
    if (!arr) {
      for (let elem of pArr) {
        document.getElementById("rowUser").removeChild(elem);
      }
      document.getElementById("rowUser").append(p);
      this.userNameError = false;
    } else if (arr.length !== username.length) {
      for (let elem of pArr) {
        document.getElementById("rowUser").removeChild(elem);
      }
      document.getElementById("rowUser").append(p);
      this.userNameError = false;
    } else {
      for (let elem of pArr) {
        document.getElementById("rowUser").removeChild(elem);
      }
      this.userNameError = true;
    }
  }

  checkPassword(password, surname, name) {
    let passwordLength = password.length;
    if (passwordLength >= 8 && passwordLength <= 16) {
      this.validCount++;
    } else {
      this.errors.push(
        "Password must contain more than 8 characters and less than 16 characters"
      );
    }
    if (password.match(/[0-9]/g)) {
      this.validCount++;
    } else {
      this.errors.push("The password must contain a number");
    }
    if (password.match(/[A-ZԱ-ՖА-Я]/g)) {
      this.validCount++;
    } else {
      this.errors.push("The password must contain a capital letter");
    }
    if (password.match(/[a-zա-ֆа-я]/g)) {
      this.validCount++;
    } else {
      this.errors.push("Password must contain lowercase letters");
    }
    let arr = password.match(/\W/g);
    let goodSymbol = [
      "!",
      "#",
      "$",
      "%",
      "^",
      "&",
      "*",
      "_",
      "+",
      "+",
      "-",
      ",",
      ".",
      "?",
      "@",
    ];
    if (arr) {
      let arrFilter = goodSymbol.filter((item, index) => arr.includes(item));

      //console.log(arr.length);
      //console.log(arrFilter.length);

      if (arr.length > arrFilter.length) {
        this.errors.push(
          "Unauthorized symbol. Can you use: !, #, $, %, ^, &, *, _, +, +, -, . ?, @"
        );
      } else {
        this.validCount++;
      }
    } else {
      this.errors.push(
        "The password must contain the following characters: !, #, $, %, ^, &, *, _, +, +, -, . ?, @"
      );
    }
    if (password.includes(surname) || password.includes(name)) {
      this.errors.push("Password cannot contain first name or last name");
    } else {
      this.validCount++;
    }
    //console.log(password.match(/\n/g));
  }
  valid(n, erors) {
    for (let eror of erors) {
      let p = document.createElement("p");
      p.innerHTML = eror;
      document.getElementById("rowPass").append(p);
    }
  }
  deleteChild(p) {
    for (let elem of p) {
      document.getElementById("rowPass").removeChild(elem);
      this.errors.pop();
    }
    this.validCount = 0;
    this.errors = [];
  }
  addLocalStorage(a, b) {
    if (a.length === 0 && b) {
      console.log("ok");
      //window.open("login.html");
      document.getElementById("form").submit();
    }
  }
  main() {
    this.deleteChild(document.querySelectorAll(".pas p"));
    this.checkUsername(document.getElementById("username").value);
    this.checkPassword(
      document.getElementById("pas").value,
      this.checkName(document.getElementById("name").value),
      this.checkSurname(document.getElementById("surname").value)
    );
    this.valid(this.validCount, this.errors);
    this.addLocalStorage(this.errors, this.userNameError);

    // return "success";
  }
}

document.getElementById("sub").addEventListener("click", function () {
  const signup = new SignupValidation();
  signup.main();
});
// document.getElementById("sub").addEventListener("keyup", function (event) {
//   if (event.code === "Enter") {
//     event.preventDefault();
//     document.querySelector("form").submit();
//   }
//   signup.main();
// });
