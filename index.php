<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Student Registration System</title>
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }

        body {
            font-family: Arial, sans-serif;
            background: #f0f2f5;
            color: #333;
        }

        header {
            background: #1a73e8;
            color: white;
            padding: 18px 30px;
            font-size: 22px;
            font-weight: bold;
            letter-spacing: 1px;
        }

        nav {
            background: #fff;
            display: flex;
            gap: 5px;
            padding: 12px 30px;
            border-bottom: 2px solid #e0e0e0;
            flex-wrap: wrap;
        }

        nav a {
            text-decoration: none;
            padding: 8px 18px;
            border-radius: 5px;
            color: #1a73e8;
            font-weight: bold;
            border: 2px solid #1a73e8;
            transition: 0.2s;
        }

        nav a:hover, nav a.active {
            background: #1a73e8;
            color: white;
        }

        .container {
            max-width: 900px;
            margin: 30px auto;
            background: white;
            border-radius: 10px;
            padding: 30px;
            box-shadow: 0 2px 12px rgba(0,0,0,0.1);
        }

        h2 {
            margin-bottom: 20px;
            color: #1a73e8;
            border-left: 4px solid #1a73e8;
            padding-left: 10px;
        }

        .form-group {
            margin-bottom: 16px;
        }

        label {
            display: block;
            margin-bottom: 5px;
            font-weight: bold;
            font-size: 14px;
        }

        input[type="text"],
        input[type="password"],
        input[type="tel"] {
            width: 100%;
            padding: 10px 14px;
            border: 1px solid #ccc;
            border-radius: 6px;
            font-size: 15px;
            transition: border 0.2s;
        }

        input:focus {
            border-color: #1a73e8;
            outline: none;
        }

        .err {
            color: red;
            font-size: 12px;
            margin-top: 4px;
        }

        button {
            padding: 10px 24px;
            border: none;
            border-radius: 6px;
            font-size: 15px;
            cursor: pointer;
            font-weight: bold;
        }

        .btn-primary { background: #1a73e8; color: white; }
        .btn-danger  { background: #e53935; color: white; }
        .btn-success { background: #2e7d32; color: white; }
        .btn-primary:hover { background: #1558b0; }
        .btn-danger:hover  { background: #b71c1c; }
        .btn-success:hover { background: #1b5e20; }

        .alert {
            padding: 12px 16px;
            border-radius: 6px;
            margin-bottom: 20px;
            font-weight: bold;
        }
        .alert-success { background: #e8f5e9; color: #2e7d32; border: 1px solid #a5d6a7; }
        .alert-error   { background: #ffebee; color: #c62828; border: 1px solid #ef9a9a; }

        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 10px;
        }

        th {
            background: #1a73e8;
            color: white;
            padding: 12px;
            text-align: left;
        }

        td {
            padding: 10px 12px;
            border-bottom: 1px solid #eee;
        }

        tr:hover td { background: #f5f9ff; }

        td a {
            color: #1a73e8;
            text-decoration: none;
            margin-right: 10px;
            font-weight: bold;
        }
        td a.del { color: #e53935; }

        .search-row {
            display: flex;
            gap: 10px;
            margin-bottom: 20px;
        }

        .search-row input {
            flex: 1;
            padding: 10px 14px;
            border: 1px solid #ccc;
            border-radius: 6px;
            font-size: 15px;
        }
    </style>
</head>
<body>

<header>🎓 Student Registration System — FSD Lab 04</header>

<nav>
    <a href="?page=insert" <?= (!isset($_GET['page']) || $_GET['page']=='insert') ? 'class="active"' : '' ?>>➕ Insert</a>
    <a href="?page=view"   <?= (isset($_GET['page']) && $_GET['page']=='view')   ? 'class="active"' : '' ?>>📋 View All</a>
    <a href="?page=search" <?= (isset($_GET['page']) && $_GET['page']=='search') ? 'class="active"' : '' ?>>🔍 Search / Update</a>
    <a href="?page=delete" <?= (isset($_GET['page']) && $_GET['page']=='delete') ? 'class="active"' : '' ?>>🗑️ Delete</a>
</nav>

<div class="container">

<?php
include 'db_connect.php';

$page = isset($_GET['page']) ? $_GET['page'] : 'insert';

if ($page === 'insert') :
    $msg = '';

    if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['insert'])) {
        $fn   = trim($_POST['first_name']);
        $ln   = trim($_POST['last_name']);
        $roll = trim($_POST['roll_no']);
        $pwd  = trim($_POST['password']);
        $cpwd = trim($_POST['confirm_password']);
        $cont = trim($_POST['contact']);

        if (empty($fn) || empty($ln) || empty($roll) || empty($pwd) || empty($cpwd) || empty($cont)) {
            $msg = "<div class='alert alert-error'>⚠️ All fields are required.</div>";
        } elseif ($pwd !== $cpwd) {
            $msg = "<div class='alert alert-error'>⚠️ Passwords do not match.</div>";
        } elseif (!preg_match('/^[0-9]{10}$/', $cont)) {
            $msg = "<div class='alert alert-error'>⚠️ Contact must be 10 digits.</div>";
        } else {
            $check = mysqli_query($conn, "SELECT roll_no FROM students WHERE roll_no='$roll'");
            if (mysqli_num_rows($check) > 0) {
                $msg = "<div class='alert alert-error'>⚠️ Roll No already exists.</div>";
            } else {
                $sql = "INSERT INTO students (roll_no, first_name, last_name, password, confirm_password, contact)
                        VALUES ('$roll','$fn','$ln','$pwd','$cpwd','$cont')";
                if (mysqli_query($conn, $sql)) {
                    $msg = "<div class='alert alert-success'>✅ Student inserted successfully!</div>";
                } else {
                    $msg = "<div class='alert alert-error'>❌ DB Error: " . mysqli_error($conn) . "</div>";
                }
            }
        }
    }
?>

<h2>Insert Student Details</h2>
<?= $msg ?>

<form id="insertForm" method="POST" action="?page=insert" onsubmit="return validateInsert()">
    <div class="form-group">
        <label>First Name</label>
        <input type="text" name="first_name" id="first_name" placeholder="e.g. Aditya">
        <div class="err" id="err_fn"></div>
    </div>
    <div class="form-group">
        <label>Last Name</label>
        <input type="text" name="last_name" id="last_name" placeholder="e.g. Sharma">
        <div class="err" id="err_ln"></div>
    </div>
    <div class="form-group">
        <label>Roll No</label>
        <input type="text" name="roll_no" id="roll_no" placeholder="e.g. CSE001">
        <div class="err" id="err_roll"></div>
    </div>
    <div class="form-group">
        <label>Password</label>
        <input type="password" name="password" id="password" placeholder="Min 6 characters">
        <div class="err" id="err_pwd"></div>
    </div>
    <div class="form-group">
        <label>Confirm Password</label>
        <input type="password" name="confirm_password" id="confirm_password" placeholder="Re-enter password">
        <div class="err" id="err_cpwd"></div>
    </div>
    <div class="form-group">
        <label>Contact Number</label>
        <input type="tel" name="contact" id="contact" placeholder="10-digit number">
        <div class="err" id="err_cont"></div>
    </div>
    <button type="submit" name="insert" class="btn-primary">➕ Insert Student</button>
</form>

<?php
elseif ($page === 'view') :
    $result = mysqli_query($conn, "SELECT * FROM students ORDER BY roll_no");
?>

<h2>All Students</h2>
<?php if (mysqli_num_rows($result) === 0) : ?>
    <div class="alert alert-error">No records found.</div>
<?php else : ?>
<table>
    <thead>
        <tr>
            <th>Roll No</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Contact</th>
            <th>Actions</th>
        </tr>
    </thead>
    <tbody>
    <?php while ($row = mysqli_fetch_assoc($result)) : ?>
        <tr>
            <td><?= htmlspecialchars($row['roll_no']) ?></td>
            <td><?= htmlspecialchars($row['first_name']) ?></td>
            <td><?= htmlspecialchars($row['last_name']) ?></td>
            <td><?= htmlspecialchars($row['contact']) ?></td>
            <td>
                <a href="?page=search&roll=<?= urlencode($row['roll_no']) ?>">✏️ Edit</a>
                <a class="del" href="?page=delete&roll=<?= urlencode($row['roll_no']) ?>"
                   onclick="return confirm('Delete <?= $row['roll_no'] ?>?')">🗑️ Delete</a>
            </td>
        </tr>
    <?php endwhile; ?>
    </tbody>
</table>
<?php endif; ?>

<?php
elseif ($page === 'search') :
    $student = null;
    $searchMsg = '';
    $updateMsg = '';

    if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['update'])) {
        $roll = trim($_POST['roll_no']);
        $fn   = trim($_POST['first_name']);
        $ln   = trim($_POST['last_name']);
        $cont = trim($_POST['contact']);

        if (!preg_match('/^[0-9]{10}$/', $cont)) {
            $updateMsg = "<div class='alert alert-error'>⚠️ Contact must be 10 digits.</div>";
        } else {
            $sql = "UPDATE students SET first_name='$fn', last_name='$ln', contact='$cont'
                    WHERE roll_no='$roll'";
            if (mysqli_query($conn, $sql)) {
                $updateMsg = "<div class='alert alert-success'>✅ Record updated successfully!</div>";
            } else {
                $updateMsg = "<div class='alert alert-error'>❌ Error: " . mysqli_error($conn) . "</div>";
            }
        }

        $res = mysqli_query($conn, "SELECT * FROM students WHERE roll_no='$roll'");
        $student = mysqli_fetch_assoc($res);
    }

    if (isset($_GET['roll']) && !empty($_GET['roll'])) {
        $roll = trim($_GET['roll']);
        $res  = mysqli_query($conn, "SELECT * FROM students WHERE roll_no='$roll'");
        if (mysqli_num_rows($res) > 0) {
            $student = mysqli_fetch_assoc($res);
        } else {
            $searchMsg = "<div class='alert alert-error'>No student found with Roll No: <b>$roll</b></div>";
        }
    }
?>

<h2>Search Student by Roll No</h2>

<form method="GET" action="?page=search">
    <input type="hidden" name="page" value="search">
    <div class="search-row">
        <input type="text" name="roll" placeholder="Enter Roll No (e.g. CSE001)"
               value="<?= isset($_GET['roll']) ? htmlspecialchars($_GET['roll']) : '' ?>">
        <button type="submit" class="btn-primary">🔍 Search</button>
    </div>
</form>

<?= $searchMsg ?>
<?= $updateMsg ?>

<?php if ($student) : ?>
<h2>Update Student Details</h2>
<form method="POST" action="?page=search" onsubmit="return validateUpdate()">
    <input type="hidden" name="roll_no" value="<?= htmlspecialchars($student['roll_no']) ?>">

    <div class="form-group">
        <label>Roll No (Read-only)</label>
        <input type="text" value="<?= htmlspecialchars($student['roll_no']) ?>" disabled style="background:#f0f0f0;">
    </div>
    <div class="form-group">
        <label>First Name</label>
        <input type="text" name="first_name" id="ufn"
               value="<?= htmlspecialchars($student['first_name']) ?>">
        <div class="err" id="uerr_fn"></div>
    </div>
    <div class="form-group">
        <label>Last Name</label>
        <input type="text" name="last_name" id="uln"
               value="<?= htmlspecialchars($student['last_name']) ?>">
        <div class="err" id="uerr_ln"></div>
    </div>
    <div class="form-group">
        <label>Contact Number</label>
        <input type="tel" name="contact" id="ucont"
               value="<?= htmlspecialchars($student['contact']) ?>">
        <div class="err" id="uerr_cont"></div>
    </div>
    <button type="submit" name="update" class="btn-success">💾 Update Record</button>
</form>
<?php endif; ?>

<?php
elseif ($page === 'delete') :
    $msg = '';

    if (isset($_GET['roll']) && !empty($_GET['roll'])) {
        $roll = trim($_GET['roll']);
        $sql  = "DELETE FROM students WHERE roll_no='$roll'";
        if (mysqli_query($conn, $sql) && mysqli_affected_rows($conn) > 0) {
            $msg = "<div class='alert alert-success'>✅ Student <b>$roll</b> deleted successfully.</div>";
        } else {
            $msg = "<div class='alert alert-error'>⚠️ No record found for Roll No: <b>$roll</b></div>";
        }
    }

    if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['delete'])) {
        $roll = trim($_POST['roll_no']);
        if (empty($roll)) {
            $msg = "<div class='alert alert-error'>⚠️ Please enter a Roll No.</div>";
        } else {
            $sql = "DELETE FROM students WHERE roll_no='$roll'";
            if (mysqli_query($conn, $sql) && mysqli_affected_rows($conn) > 0) {
                $msg = "<div class='alert alert-success'>✅ Student <b>$roll</b> deleted successfully.</div>";
            } else {
                $msg = "<div class='alert alert-error'>⚠️ No record found for Roll No: <b>$roll</b></div>";
            }
        }
    }
?>

<h2>Delete Student Record</h2>
<?= $msg ?>

<form method="POST" action="?page=delete" onsubmit="return confirm('Are you sure you want to delete this student?')">
    <div class="form-group">
        <label>Enter Roll No to Delete</label>
        <input type="text" name="roll_no" placeholder="e.g. CSE001" style="max-width:300px;">
    </div>
    <button type="submit" name="delete" class="btn-danger">🗑️ Delete Student</button>
</form>

<?php endif; ?>

</div>

<script>
function validateInsert() {
    let valid = true;

    function showErr(id, msg) {
        document.getElementById(id).textContent = msg;
        if (msg) valid = false;
    }

    const fn   = document.getElementById('first_name').value.trim();
    const ln   = document.getElementById('last_name').value.trim();
    const roll = document.getElementById('roll_no').value.trim();
    const pwd  = document.getElementById('password').value.trim();
    const cpwd = document.getElementById('confirm_password').value.trim();
    const cont = document.getElementById('contact').value.trim();

    showErr('err_fn',   fn   ? '' : 'First name is required.');
    showErr('err_ln',   ln   ? '' : 'Last name is required.');
    showErr('err_roll', roll ? '' : 'Roll No is required.');

    if (!pwd)         showErr('err_pwd', 'Password is required.');
    else if (pwd.length < 6) showErr('err_pwd', 'Password must be at least 6 characters.');
    else              showErr('err_pwd', '');

    if (!cpwd)        showErr('err_cpwd', 'Confirm password is required.');
    else if (cpwd !== pwd) showErr('err_cpwd', 'Passwords do not match.');
    else              showErr('err_cpwd', '');

    if (!cont)                        showErr('err_cont', 'Contact number is required.');
    else if (!/^\d{10}$/.test(cont))  showErr('err_cont', 'Contact must be exactly 10 digits.');
    else                              showErr('err_cont', '');

    return valid;
}

function validateUpdate() {
    let valid = true;

    function showErr(id, msg) {
        document.getElementById(id).textContent = msg;
        if (msg) valid = false;
    }

    const fn   = document.getElementById('ufn').value.trim();
    const ln   = document.getElementById('uln').value.trim();
    const cont = document.getElementById('ucont').value.trim();

    showErr('uerr_fn',   fn   ? '' : 'First name is required.');
    showErr('uerr_ln',   ln   ? '' : 'Last name is required.');

    if (!cont)                        showErr('uerr_cont', 'Contact is required.');
    else if (!/^\d{10}$/.test(cont))  showErr('uerr_cont', 'Contact must be exactly 10 digits.');
    else                              showErr('uerr_cont', '');

    return valid;
}
</script>

</body>
</html>
