"use strict";
/* =====================================================================
   Epsilon — internal business system. 100% client-side.
   All data lives in this browser's localStorage under one key.
   ===================================================================== */
var LS_KEY = "epsilon_web_v1";
var storageOK = true;
try { localStorage.setItem("__eps_test","1"); localStorage.removeItem("__eps_test"); }
catch(e){ storageOK = false; }

/* ---------------- i18n ---------------- */
var T = {
en:{ dir:"ltr", langName:"العربية",
  dashboard:"Dashboard", products:"Products", inventory:"Inventory", sales:"Sales Invoices", purchases:"Purchase Invoices",
  customers:"Customers", suppliers:"Suppliers", payments:"Payments", expenses:"Expenses", commissions:"Commissions",
  accounts:"Cash & Bank", financials:"Financials", crm:"CRM Leads", followups:"Follow-ups", quotations:"Quotations",
  reports:"Reports", activity:"Activity Log", users:"Users", settings:"Settings",
  secMain:"Main", secSales:"Sales & Stock", secMoney:"Money", secCrm:"CRM", secAdmin:"Admin",
  user:"User", admin:"Admin", salesRole:"Sales Employee",
  salesToday:"Sales today", salesMonth:"Sales this month", collected:"Collected (all time)", outstanding:"Outstanding receivables",
  invValue:"Inventory value (cost)", lowStock:"Low stock items", grossProfit:"Gross profit", totalExpenses:"Expenses",
  netProfit:"Net profit", topProducts:"Top products (by quantity sold)", salesByEmp:"Sales by employee",
  addProduct:"Add product", edit:"Edit", delete:"Delete", save:"Save", cancel:"Cancel", close:"Close", add:"Add",
  name:"Name", purchaseCost:"Purchase cost", sellingPrice:"Selling price", qty:"Quantity", quantity:"Quantity",
  category:"Category", brand:"Brand", model:"Model", minStock:"Min stock alert", supplier:"Supplier", notes:"Notes",
  priceHistory:"Price change history", actions:"Actions", search:"Search", all:"All", lowOnly:"Low stock only",
  stock:"Stock", margin:"Margin", noData:"Nothing here yet.", required:"This field is required.",
  movements:"Inventory movements", type:"Type", date:"Date", reference:"Reference", balance:"Balance",
  newInvoice:"New sales invoice", customer:"Customer", employee:"Employee", items:"Items", product:"Product",
  price:"Price", discount:"Discount", total:"Total", paid:"Paid", remaining:"Remaining", status:"Status",
  number:"No.", print:"Print view", cancelInvoice:"Cancel invoice", addPayment:"Add payment", addItem:"Add item",
  statusPaid:"Paid", statusPartial:"Partially paid", statusUnpaid:"Unpaid", statusCancelled:"Cancelled", statusActive:"Active",
  newPurchase:"New purchase invoice", phone:"Phone", email:"Email", address:"Address", openingBalance:"Opening balance",
  statement:"Statement", view:"View", newCustomer:"Add customer", newSupplier:"Add supplier",
  whatsapp:"WhatsApp", addNewCustomerBtn:"+ New customer", useExistingCustomer:"Use existing customer", newCustInlineTitle:"New customer — saved to Customers", newCustInlineNote:"This customer will be created in the main Customers list — same record, balance and statement as any customer added from the Customers section — and this invoice (the new order) will be linked to them automatically. No extra step needed.", customerSavedInline:"New customer saved to Customers: ", duplicateCustomerFound:"A customer with this phone / WhatsApp already exists — the invoice was linked to that customer instead of creating a duplicate: ", chooseCustomerOrNew:"or add a brand-new customer for this order:",
  paymentsIn:"Customer payments (in)", paymentsOut:"Supplier payments (out)", method:"Method", cash:"Cash", bank:"Bank",
  amount:"Amount", newPayment:"Record payment", party:"Party", direction:"Direction", inTxt:"In (from customer)", outTxt:"Out (to supplier)",
  newExpense:"Add expense", expenseTitle:"Title", expenseCat:"Category", commissionsNote:"Commission is calculated on each sales invoice total at the rate set in Settings. Only PAID commissions reduce net profit.",
  commPaid:"Paid", commUnpaid:"Unpaid", markPaid:"Mark paid", markUnpaid:"Mark unpaid", rate:"Rate",
  cashIn:"Cash in", cashOut:"Cash out", bankIn:"Bank in", bankOut:"Bank out", net:"Net",
  revenue:"Revenue (invoiced)", cogs:"Cost of goods sold", collectedCash:"Collected cash", receivables:"Receivables",
  payables:"Supplier payables (owed)", finNote:"Revenue is what was invoiced; collected cash is what actually arrived. They are not the same number.",
  leads:"Leads", newLead:"Add lead", stage:"Stage", company:"Company", source:"Source", estValue:"Estimated value",
  nextFollow:"Next follow-up", lostReason:"Lost reason", convertCust:"Customer created", followToday:"Due today", followOverdue:"Overdue", followUpcoming:"Upcoming",
  markDone:"Reschedule / log", followLog:"Follow-up log", quotationsNew:"New quotation", convertToInvoice:"Convert to invoice",
  quoteStatusDraft:"Draft", quoteStatusSent:"Sent", quoteStatusAccepted:"Accepted", quoteStatusRejected:"Rejected", quoteStatusConverted:"Converted to invoice",
  reportsTitle:"Reports", from:"From", to:"To", runReport:"Show report", exportCsv:"Export CSV", reportType:"Report type",
  repSales:"Sales report", repProducts:"Product performance", repCustomers:"Customer balances", repExpenses:"Expenses report", repStock:"Stock report",
  activityLog:"Activity log", when:"When", who:"Who", action:"Action", detail:"Detail",
  usersTitle:"Users & roles", role:"Role", usersNote:"Only admins can manage users. Sales employees cannot see Expenses, Financials / net profit, Activity Log, Users or Settings.",
  username:"Username", password:"Password", login:"Sign in", loginWelcome:"Sign in to Epsilon", loginSub:"Use the username and password your admin gave you.", loginError:"Wrong username or password.", loginInactive:"This account is deactivated. Contact your admin.", logout:"Sign out", noSignup:"No self-registration — accounts are created by the admin only, from the Users section.", passwordKeep:"Leave blank to keep the current password.", newPassword:"New password", passwordMin:"Password must be at least 4 characters.", usernameTaken:"This username is already used by another account.", shareNote:"Accounts and data live in this browser on this device. To let someone in on THIS device: create their account here (username + password) and they sign in with it here. On another device, that person first opens the page and imports a backup you exported from Settings — accounts travel with the backup. Nobody can create an account on their own.", signedInAs:"Signed in as", deviceNote:"Accounts live in this device's browser. Moving to another device? The admin exports a backup from Settings and imports it there — accounts travel with the backup.", setupTitle:"Set up your admin account", setupSub:"This is the first run on this device and no admin password exists yet. Choose your admin username and password — you will sign in with them and use this account to create accounts for your team.", setupBtn:"Create admin account & sign in", confirmPassword:"Confirm password", passMismatch:"Passwords do not match.", changeTitle:"Set your own password", changeSub:"Your admin set a temporary password for this account. Choose your own password to continue.", changeBtn:"Save password & sign in", noPasswordSet:"No password set — edit this user and set a password before they can sign in.",
  addUser:"Add user", editUser:"Edit user", setActive:"Set as active user", isActiveUser:"Current user", activate:"Activate", deactivate:"Deactivate", activeLbl:"Active", inactiveLbl:"Inactive", totalUsers:"Total users", totalAdmins:"Admins", totalSales:"Sales employees", cannotDelSelf:"You cannot delete the current active user. Switch to another user first.", cannotDelLastAdmin:"You cannot delete or demote the last admin — the system must always keep at least one admin.", cannotDeactivateSelf:"You cannot deactivate the current active user.", userSaved:"User saved.", userDeleted:"User deleted.", confirmDeleteUser:"Delete this user? Their past invoices and activity stay recorded under their name.",
  expIdeaTitle:"What is the idea of Expenses?", expIdeaIntro:"Expenses are the operating costs of running Epsilon — money you spend to keep the business running, NOT products you buy to resell. Every expense you record here is subtracted from gross profit to get net profit, and it also reduces your Cash or Bank balance depending on the payment method you choose.",
  expIdeaFormula:"Net profit = Gross profit (sales − cost of goods sold) − Expenses − Paid commissions",
  expIdeaDiffTitle:"Expenses vs Purchases vs Payments — what is the difference?", expIdeaDiff1:"Purchase invoice: goods that go into stock and will be resold (motors, pumps, cables…). Its cost is counted later as COGS when you sell, not as an expense.", expIdeaDiff2:"Expense: a cost with no stock and nothing to resell — rent, salaries, transport, electricity, marketing, maintenance. It hits profit immediately on its date.", expIdeaDiff3:"Payment: just money moving — collecting from a customer or paying a supplier for an invoice. A payment by itself is not profit or loss.",
  expIdeaHowTitle:"How to use this section", expIdeaHow:"Add each operating cost as it happens: give it a clear title (e.g. “November office rent”), pick a category, enter the amount and date, and choose Cash or Bank so the Cash & Bank balances stay correct. Use the category totals above to see where the money goes each month. Only admins can see this section — sales employees never see expenses or net profit.",
  expIdeaExample:"Example: you sell for 30,000 EGP, the goods cost you 20,000 EGP → gross profit 10,000 EGP. Rent 6,000 + transport 500 = 6,500 EGP expenses → net profit 3,500 EGP (before paid commissions). Without recording expenses, the dashboard would wrongly show 10,000 EGP as your profit.",
  settingsTitle:"Settings", commissionPct:"Default commission %", allowNegative:"Allow negative stock (overselling)", allowNegativeHelp:"Off = an invoice cannot sell more than the available stock.",
  backup:"Backup", exportBackup:"Export backup (JSON)", importBackup:"Import backup (JSON)", importWarn:"Importing replaces ALL current data on this device with the backup file's data.",
  demo:"Demo data", loadDemo:"Load demo data", clearDemo:"Clear demo data", demoNote:"Demo records are labelled DEMO so you can try the system safely. Clearing demo data removes only demo records.",
  dangerZone:"Danger zone", clearAll:"Erase ALL data", clearAllWarn:"This permanently deletes every record stored on this device. Export a backup first.",
  savedOk:"Saved.", deletedOk:"Deleted.", cancelledOk:"Cancelled and stock/balances reversed.",
  confirmDelete:"Are you sure you want to delete this?", confirmCancelInv:"Cancel this invoice? Stock and balances will be reversed. The invoice is kept as Cancelled, never deleted.",
  confirmClearAll:"Type DELETE to confirm erasing all data.", confirmDemoClear:"Remove all DEMO records? Real records are not touched.",
  notEnoughStock:"Not enough stock for", allowNegOff:"Enable negative stock in Settings or reduce the quantity.",
  chooseProduct:"Choose a product for every row.", chooseCustomer:"Choose a customer.", chooseSupplier:"Choose a supplier.",
  invalidAmount:"Enter a valid amount greater than zero.", lostReasonReq:"A lost reason is required to move a lead to Lost.",
  storageOff:"Local storage is unavailable in this browser, so data will NOT be saved after you close this page. Enable storage / cookies for this site, or export a backup before leaving.",
  backupDone:"Backup downloaded.", importDone:"Backup imported successfully.", importBad:"That file is not a valid Epsilon backup.",
  invoice:"Invoice", quotation:"Quotation", terms:"Thank you for your business.", preparedBy:"Prepared by", signature:"Signature",
  opening:"Opening", purchase:"Purchase", sale:"Sale", saleCancel:"Sale cancelled (reversal)", purchaseCancel:"Purchase cancelled (reversal)", adjustment:"Adjustment",
  adjustStock:"Adjust stock", newQty:"New quantity", reason:"Reason", leadWonMsg:"Lead marked Won — customer record created.",
  today:"Today", thisMonth:"This month", dueDate:"Due date", description:"Description", value:"Value",
  stageNew:"New Lead", stageContacted:"Contacted", stageInterested:"Interested", stageQualified:"Qualified",
  stageQuotation:"Quotation Sent", stageNegotiation:"Negotiation", stageWon:"Won", stageLost:"Lost",
  moveBack:"Back", moveNext:"Next", setStatus:"Set status", lead:"Lead", forCustomer:"For (customer or lead)",
  invoiceFor:"Invoice", generalPayment:"General payment (not tied to an invoice)", payAgainst:"Apply to invoice",
  none:"— None —", langSaved:"Language saved.", userSwitched:"Active user:", openingBalNote:"Opening balance owed at start (positive = they owe us / we owe them).",
  qtySold:"Qty sold", revenueCol:"Revenue", profitCol:"Profit", empSales:"Employee sales", custBalance:"Customer balances",
  totalDue:"Total due", totalOwed:"Total we owe", expByCat:"Expenses by category", stockValue:"Stock value",
  printBtn:"Print / Save PDF", backToApp:"Back", docFrom:"Epsilon", validUntil:"Valid until",
  createdBy:"Created by", historyFor:"History", noHistory:"No changes recorded yet.", wasPrice:"was", nowPrice:"now",
  openingStock:"Opening stock", addStockNote:"Quantity on hand right now. Stock changes afterwards come from invoices and adjustments.",
  leadValue:"Deal value", contactName:"Contact name", followNotePh:"What happened / next step…", nextDate:"Next follow-up date",
  reschedule:"Save follow-up", quotationForLead:"Quotation created from lead", selectLeadCust:"Customer / lead name (free text if new)",
  reportsSalesHead:"Sales invoices in period", totalSalesPeriod:"Total sales in period", totalCollectedPeriod:"Collected in period",
  expensesPeriod:"Expenses in period", profitPeriod:"Gross profit in period", count:"Count", sku:"Item",
  cashFlowNote:"Balances below are calculated from every recorded payment and expense, by method.",
  account:"Account", inFlow:"In", outFlow:"Out", balanceNow:"Balance",
  commOnInvoice:"Commission on invoice", totalCommissions:"Total commissions", paidCommissions:"Paid commissions", unpaidCommissions:"Unpaid commissions",
  removeItem:"Remove item", searchByCustomer:"Search by customer / party name", searchByProduct:"Search by product",
  profitByProduct:"Company profit by product — what sold most", profitByProductNote:"This is the COMPANY profit per product (selling price − purchase cost), not employee commissions. Sorted by quantity sold, biggest first.",
  costCol:"Total cost", shareOfSales:"Share of qty sold", rateControl:"Commission rate control", rateControlNote:"Change the default % here — it applies to NEW sales invoices. To change one invoice's commission, edit its % in the table below and press Save next to it; the amount is recalculated from that invoice's total.",
  saveRate:"Save rate", perCustomerTitle:"By customer — how much each customer paid", perSupplierTitle:"By supplier — how much we paid each supplier",
  ledgerTitle:"All cash & bank movements (searchable)", paymentsCount:"Payments", lastPayment:"Last payment", totalPaidIn:"Total received",
  allMethods:"All methods", stockQtyTitle:"Stock quantities", dataSavedNote:"Your data is saved automatically on this device after every change — you do not need to re-enter it.",
  finPeriod:"All-time figures (cancelled invoices excluded).", leadsPipeline:"Pipeline", leadsList:"All leads (list)",
  searchPh:"Type to filter…", filter:"Filter", reset:"Reset", yes:"Yes", no:"No", egp:"EGP",
  errGeneric:"Something went wrong. Your saved data was not changed.", reload:"Reload page",
  stockAfter:"Stock after", change:"Change", unitCost:"Unit cost", lineTotal:"Line total",
  subtotal:"Subtotal", grandTotal:"Grand total", invoiceDate:"Invoice date", due:"Due",
  payNow:"Amount paid now", payMethod:"Payment method", itemsRequired:"Add at least one item with quantity above zero.",
  customerStatement:"Customer statement", supplierStatement:"Supplier statement", debit:"Debit", credit:"Credit", running:"Running balance",
  txSale:"Sale invoice", txPurchase:"Purchase invoice", txPaymentIn:"Payment received", txPaymentOut:"Payment made", txOpening:"Opening balance", txCancelled:"(cancelled)",
  commissionFor:"Commission — invoice", settingsSaved:"Settings saved.", demoLoaded:"Demo data loaded.", demoCleared:"Demo data cleared.",
  allCleared:"All data erased. The app starts empty again (users kept).", selectFile:"Choose backup file", usersListNote:"Each person signs in with their own username and password. To switch accounts, sign out and sign in with the other account.",
  roleAdminDesc:"Full access to every module, including Expenses, Financials, Activity Log and Settings.", roleSalesDesc:"Sales work only: dashboard (no net profit), products, stock, invoices, customers, suppliers, payments, commissions, accounts, CRM, quotations and reports.",
  permDenied:"Your role does not have access to this section.", moveStage:"Move", addFollow:"Log follow-up",
  leadStageChanged:"Stage updated.", quotationSaved:"Quotation saved.", convertedOk:"Quotation converted to a sales invoice.",
  alreadyConverted:"This quotation was already converted.", adjustDone:"Stock adjusted.", priceUpdated:"Price updated and history recorded.",
  expenseCats:"Rent, Salaries, Transport, Utilities, Marketing, Maintenance, Other", leadSources:"Referral, Website, Social media, Phone call, Walk-in, Exhibition, Other",
  productCats:"Motors, Pumps, Cables, Control Panels, Generators, Spare Parts, Tools, Other",
  demoTag:"DEMO", editProduct:"Edit product", editCustomer:"Edit customer", editSupplier:"Edit supplier", editLead:"Edit lead", editExpense:"Edit expense",
  invoiceItems:"Invoice items", openInvoices:"Open invoices", noOpenInvoices:"No open invoices.", totalPaid:"Total paid", ofTotal:"of",
  viewStatement:"Statement", hideStatement:"Hide statement", perms:"Permissions",
  searchByNamePhone:"Search by name or phone", searchCustPh:"Type a name or phone number…",
  searchInvoiceTitle:"Search sales invoices", searchInvoicePh:"Invoice number, customer name or phone…",
  results:"results", totalOfResults:"Total of results",
  balCustOwes:"Owes us — still to collect from him", balCustCredit:"We owe him — he paid extra",
  balSuppWeOwe:"We owe the supplier — still to pay him", balSuppCredit:"Owed to us — we paid extra",
  balSettled:"Settled — nothing due",
  totalBilled:"Total invoiced (what he owes)", totalHePaid:"Total he paid", stillOwesLbl:"Still owes",
  totalBought:"Total purchased (what we owe)", totalWePaid:"Total we paid", stillWeOweLbl:"Still we owe",
  recordedBy:"Recorded by", unknownRecorder:"Not recorded (older entry)",
  paymentHistory:"Payments — when he paid & who recorded them", invoicesPayStatus:"Invoices & payment status",
  payThisInvoice:"Record payment",
  stmtExplainCust:"Plainly: Debit = invoices he owes us. Credit = money he paid. The running balance is what is left for him to pay.",
  stmtExplainSupp:"Plainly: Debit = purchase invoices we owe the supplier. Credit = money we paid him. The running balance is what is left for us to pay.",
  debitCust:"Debit (he owes — invoices)", creditCust:"Credit (he paid)",
  debitSupp:"Debit (we owe — purchases)", creditSupp:"Credit (we paid)",
  overpayInfo:"If the amount is more than the remaining balance, the extra is kept as a credit on his account and shows in his statement.",
  invPayInfo:"Invoice total / already paid / remaining",
  payGroupedCust:"Payments grouped by customer", payGroupedSupp:"Payments grouped by supplier",
  allDirections:"All (in & out)", finPeriodLbl:"Totals for the selected period", finByMonth:"Breakdown by month", finByDate:"Breakdown by date (cash movement)",
  finAllTime:"All-time totals", salesCol:"Sales", collectedCol:"Collected", paidOutCol:"Paid to suppliers",
  cashNet:"Net cash movement", monthCol:"Month", overpaidStatus:"Paid + extra"
},
ar:{ dir:"rtl", langName:"English",
  dashboard:"لوحة التحكم", products:"المنتجات", inventory:"المخزون", sales:"فواتير البيع", purchases:"فواتير الشراء",
  customers:"العملاء", suppliers:"الموردون", payments:"المدفوعات", expenses:"المصروفات", commissions:"العمولات",
  accounts:"الكاش والبنك", financials:"الحسابات المالية", crm:"العملاء المحتملون", followups:"المتابعات", quotations:"عروض الأسعار",
  reports:"التقارير", activity:"سجل النشاط", users:"المستخدمون", settings:"الإعدادات",
  secMain:"الرئيسية", secSales:"المبيعات والمخزون", secMoney:"الأموال", secCrm:"إدارة العملاء", secAdmin:"الإدارة",
  user:"المستخدم", admin:"مدير", salesRole:"موظف مبيعات",
  salesToday:"مبيعات اليوم", salesMonth:"مبيعات الشهر", collected:"المتحصّل (إجمالي)", outstanding:"المستحقات على العملاء",
  invValue:"قيمة المخزون (بالتكلفة)", lowStock:"أصناف منخفضة المخزون", grossProfit:"إجمالي الربح", totalExpenses:"المصروفات",
  netProfit:"صافي الربح", topProducts:"أفضل المنتجات (حسب الكمية المباعة)", salesByEmp:"المبيعات حسب الموظف",
  addProduct:"إضافة منتج", edit:"تعديل", delete:"حذف", save:"حفظ", cancel:"إلغاء", close:"إغلاق", add:"إضافة",
  name:"الاسم", purchaseCost:"سعر الشراء", sellingPrice:"سعر البيع", qty:"الكمية", quantity:"الكمية",
  category:"الفئة", brand:"الماركة", model:"الموديل", minStock:"حد تنبيه المخزون", supplier:"المورد", notes:"ملاحظات",
  priceHistory:"سجل تغيير الأسعار", actions:"إجراءات", search:"بحث", all:"الكل", lowOnly:"المنخفض فقط",
  stock:"المخزون", margin:"هامش الربح", noData:"لا توجد بيانات بعد.", required:"هذا الحقل مطلوب.",
  movements:"حركات المخزون", type:"النوع", date:"التاريخ", reference:"المرجع", balance:"الرصيد",
  newInvoice:"فاتورة بيع جديدة", customer:"العميل", employee:"الموظف", items:"الأصناف", product:"المنتج",
  price:"السعر", discount:"الخصم", total:"الإجمالي", paid:"المدفوع", remaining:"المتبقي", status:"الحالة",
  number:"رقم", print:"عرض الطباعة", cancelInvoice:"إلغاء الفاتورة", addPayment:"إضافة دفعة", addItem:"إضافة صنف",
  statusPaid:"مدفوعة", statusPartial:"مدفوعة جزئيًا", statusUnpaid:"غير مدفوعة", statusCancelled:"ملغاة", statusActive:"نشطة",
  newPurchase:"فاتورة شراء جديدة", phone:"الهاتف", email:"البريد الإلكتروني", address:"العنوان", openingBalance:"رصيد افتتاحي",
  statement:"كشف حساب", view:"عرض", newCustomer:"إضافة عميل", newSupplier:"إضافة مورد",
  whatsapp:"واتساب", addNewCustomerBtn:"+ عميل جديد", useExistingCustomer:"اختيار عميل موجود", newCustInlineTitle:"عميل جديد — هيتحفظ في العملاء", newCustInlineNote:"العميل ده هيتسجل في قائمة العملاء الرئيسية — نفس السجل والأرصدة وكشف الحساب زي أي عميل متسجل من قسم العملاء بالظبط — والفاتورة دي (الطلب الجديد) هتتربط بيه تلقائيًا. مش محتاج أي خطوة إضافية.", customerSavedInline:"تم حفظ عميل جديد في العملاء: ", duplicateCustomerFound:"في عميل مسجل بنفس التليفون / الواتساب — تم ربط الفاتورة بيه بدل إنشاء نسخة مكررة: ", chooseCustomerOrNew:"أو ضيف عميل جديد خالص للطلب ده:",
  paymentsIn:"تحصيلات العملاء (وارد)", paymentsOut:"مدفوعات الموردين (صادر)", method:"طريقة الدفع", cash:"كاش", bank:"بنك",
  amount:"المبلغ", newPayment:"تسجيل دفعة", party:"الطرف", direction:"الاتجاه", inTxt:"وارد (من عميل)", outTxt:"صادر (إلى مورد)",
  newExpense:"إضافة مصروف", expenseTitle:"البند", expenseCat:"الفئة", commissionsNote:"تُحسب العمولة على إجمالي كل فاتورة بيع بالنسبة المضبوطة في الإعدادات. العمولات المدفوعة فقط هي التي تخفض صافي الربح.",
  commPaid:"مدفوعة", commUnpaid:"غير مدفوعة", markPaid:"تعليم كمدفوعة", markUnpaid:"تعليم كغير مدفوعة", rate:"النسبة",
  cashIn:"وارد كاش", cashOut:"صادر كاش", bankIn:"وارد بنك", bankOut:"صادر بنك", net:"الصافي",
  revenue:"الإيراد (قيمة الفواتير)", cogs:"تكلفة البضاعة المباعة", collectedCash:"الكاش المتحصّل فعليًا", receivables:"مستحقات العملاء",
  payables:"مستحقات الموردين (علينا)", finNote:"الإيراد هو قيمة ما تم إصدار فواتير به، والكاش المتحصّل هو ما وصل فعليًا. الرقمان مختلفان.",
  leads:"العملاء المحتملون", newLead:"إضافة عميل محتمل", stage:"المرحلة", company:"الشركة", source:"المصدر", estValue:"القيمة المتوقعة",
  nextFollow:"المتابعة القادمة", lostReason:"سبب الخسارة", convertCust:"تم إنشاء العميل", followToday:"مستحقة اليوم", followOverdue:"متأخرة", followUpcoming:"قادمة",
  markDone:"تسجيل / إعادة جدولة", followLog:"سجل المتابعات", quotationsNew:"عرض سعر جديد", convertToInvoice:"تحويل إلى فاتورة",
  quoteStatusDraft:"مسودة", quoteStatusSent:"تم الإرسال", quoteStatusAccepted:"مقبول", quoteStatusRejected:"مرفوض", quoteStatusConverted:"تحوّل إلى فاتورة",
  reportsTitle:"التقارير", from:"من", to:"إلى", runReport:"عرض التقرير", exportCsv:"تصدير CSV", reportType:"نوع التقرير",
  repSales:"تقرير المبيعات", repProducts:"أداء المنتجات", repCustomers:"أرصدة العملاء", repExpenses:"تقرير المصروفات", repStock:"تقرير المخزون",
  activityLog:"سجل النشاط", when:"الوقت", who:"المستخدم", action:"الإجراء", detail:"التفاصيل",
  usersTitle:"المستخدمون والصلاحيات", role:"الدور", usersNote:"المديرون فقط هم من يديرون المستخدمين. موظفو المبيعات لا يرون المصروفات ولا الحسابات المالية / صافي الربح ولا سجل النشاط ولا المستخدمين ولا الإعدادات.",
  username:"اسم المستخدم", password:"كلمة المرور", login:"تسجيل الدخول", loginWelcome:"تسجيل الدخول إلى Epsilon", loginSub:"استخدم اسم المستخدم وكلمة المرور اللي الإدارة عملتهملك.", loginError:"اسم المستخدم أو كلمة المرور غلط.", loginInactive:"الحساب ده موقوف. كلّم الإدارة.", logout:"تسجيل الخروج", noSignup:"مفيش إنشاء حساب ذاتي — الحسابات بتتعمل من الإدارة فقط من قسم المستخدمين.", passwordKeep:"سيبها فاضية لو مش عايز تغيّر كلمة المرور الحالية.", newPassword:"كلمة مرور جديدة", passwordMin:"كلمة المرور لازم تكون 4 حروف أو أرقام على الأقل.", usernameTaken:"اسم المستخدم ده مستخدم في حساب تاني.", shareNote:"الحسابات والبيانات موجودة في المتصفح ده على الجهاز ده. عشان تدخّل حد على الجهاز ده: اعمله حساب هنا (يوزر + باسورد) وهيسجّل دخول بيه هنا. على جهاز تاني، لازم الشخص يفتح الصفحة ويستورد نسخة احتياطية انت مصدّرها من الإعدادات — الحسابات بتتنقل مع النسخة الاحتياطية. محدش يقدر يعمل حساب لوحده.", signedInAs:"مسجّل دخول باسم", deviceNote:"الحسابات موجودة على متصفح الجهاز ده. نقل لجهاز تاني؟ الأدمن بيصدّر نسخة احتياطية من الإعدادات وبيستوردها هناك — الحسابات بتتنقل مع النسخة الاحتياطية.", setupTitle:"إعداد حساب الأدمن", setupSub:"دي أول مرة تشغيل على الجهاز ده ولسه مفيش كلمة مرور للأدمن. اختر اسم مستخدم وكلمة مرور الأدمن — هتسجّل دخول بيهم وهتستخدم الحساب ده لإنشاء حسابات فريقك.", setupBtn:"إنشاء حساب الأدمن وتسجيل الدخول", confirmPassword:"تأكيد كلمة المرور", passMismatch:"كلمتا المرور مش متطابقتين.", changeTitle:"حط كلمة المرور بتاعتك", changeSub:"الأدمن حط كلمة مرور مؤقتة للحساب ده. اختر كلمة المرور بتاعتك عشان تكمل.", changeBtn:"حفظ كلمة المرور وتسجيل الدخول", noPasswordSet:"بدون كلمة مرور — عدّل المستخدم وحطّله كلمة مرور قبل ما يقدر يسجّل دخول.",
  addUser:"إضافة مستخدم", editUser:"تعديل مستخدم", setActive:"تعيين كمستخدم حالي", isActiveUser:"المستخدم الحالي", activate:"تفعيل", deactivate:"إيقاف", activeLbl:"مفعّل", inactiveLbl:"موقوف", totalUsers:"إجمالي المستخدمين", totalAdmins:"المديرون", totalSales:"موظفو المبيعات", cannotDelSelf:"لا يمكنك حذف المستخدم الحالي النشط. بدّل لمستخدم آخر أولًا.", cannotDelLastAdmin:"لا يمكنك حذف أو تخفيض آخر مدير — يجب أن يبقى في النظام مدير واحد على الأقل دائمًا.", cannotDeactivateSelf:"لا يمكنك إيقاف المستخدم الحالي النشط.", userSaved:"تم حفظ المستخدم.", userDeleted:"تم حذف المستخدم.", confirmDeleteUser:"حذف هذا المستخدم؟ فواتيره ونشاطه السابق سيبقى مسجلًا باسمه.",
  expIdeaTitle:"ما هي فكرة المصروفات؟", expIdeaIntro:"المصروفات هي تكاليف تشغيل شركة Epsilon — فلوس بتصرفها عشان الشغل يفضل شغال، وليست منتجات بتشتريها عشان تبيعها. كل مصروف بتسجله هنا بيقلل صافي الربح، وبيقلل كمان رصيد الكاش أو البنك حسب طريقة الدفع اللي بتختارها.",
  expIdeaFormula:"صافي الربح = إجمالي الربح (المبيعات − تكلفة البضاعة المباعة) − المصروفات − العمولات المدفوعة",
  expIdeaDiffTitle:"المصروفات × المشتريات × المدفوعات — إيه الفرق؟", expIdeaDiff1:"فاتورة شراء: بضاعة بتدخل المخزون وهتتباع بعد كده (محركات، مضخات، كابلات…). تكلفتها بتتحسب لاحقًا كتكلفة بضاعة مباعة وقت البيع، وليست مصروفًا.", expIdeaDiff2:"مصروف: تكلفة من غير مخزون ومن غير حاجة تتباع — إيجار، رواتب، نقل، كهرباء، تسويق، صيانة. بيأثر على الربح فورًا في تاريخه.", expIdeaDiff3:"دفعة (مدفوعات): مجرد حركة فلوس — تحصيل من عميل أو سداد لمورد مقابل فاتورة. الدفعة لوحدها ليست ربحًا ولا خسارة.",
  expIdeaHowTitle:"إزاي تستخدم القسم ده", expIdeaHow:"سجّل كل تكلفة تشغيل وقت ما تحصل: اكتب بند واضح (مثلًا «إيجار المكتب شهر نوفمبر»)، اختر الفئة، وحط المبلغ والتاريخ، واختر كاش أو بنك عشان أرصدة الكاش والبنك تفضل صح. استخدم إجماليات الفئات اللي فوق عشان تعرف الفلوس بتروح فين كل شهر. القسم ده للمديرين فقط — موظفو المبيعات لا يرون المصروفات ولا صافي الربح أبدًا.",
  expIdeaExample:"مثال: بعت بـ 30,000 ج.م والبضاعة كلفتك 20,000 ج.م ← إجمالي الربح 10,000 ج.م. إيجار 6,000 + نقل 500 = 6,500 ج.م مصروفات ← صافي الربح 3,500 ج.م (قبل العمولات المدفوعة). لو مسجلتش المصروفات، لوحة التحكم هتوريك 10,000 ج.م على إنها ربحك — وده غلط.",
  settingsTitle:"الإعدادات", commissionPct:"نسبة العمولة الافتراضية %", allowNegative:"السماح بالمخزون السالب (البيع فوق المتاح)", allowNegativeHelp:"إيقاف = لا يمكن لفاتورة أن تبيع أكثر من المخزون المتاح.",
  backup:"النسخ الاحتياطي", exportBackup:"تصدير نسخة احتياطية (JSON)", importBackup:"استيراد نسخة احتياطية (JSON)", importWarn:"الاستيراد يستبدل كل البيانات الحالية على هذا الجهاز ببيانات ملف النسخة الاحتياطية.",
  demo:"بيانات تجريبية", loadDemo:"تحميل بيانات تجريبية", clearDemo:"مسح البيانات التجريبية", demoNote:"السجلات التجريبية موسومة بـ DEMO لتجربة النظام بأمان. مسح البيانات التجريبية يزيل السجلات التجريبية فقط.",
  dangerZone:"منطقة الخطر", clearAll:"مسح كل البيانات", clearAllWarn:"هذا يحذف نهائيًا كل سجل محفوظ على هذا الجهاز. صدّر نسخة احتياطية أولًا.",
  savedOk:"تم الحفظ.", deletedOk:"تم الحذف.", cancelledOk:"تم الإلغاء وعكس المخزون والأرصدة.",
  confirmDelete:"هل أنت متأكد من حذف هذا العنصر؟", confirmCancelInv:"إلغاء هذه الفاتورة؟ سيتم عكس المخزون والأرصدة. تبقى الفاتورة بحالة ملغاة ولا تُحذف أبدًا.",
  confirmClearAll:"اكتب DELETE للتأكيد على مسح كل البيانات.", confirmDemoClear:"إزالة كل سجلات DEMO؟ السجلات الحقيقية لن تُمس.",
  notEnoughStock:"المخزون غير كافٍ لـ", allowNegOff:"فعّل المخزون السالب في الإعدادات أو قلّل الكمية.",
  chooseProduct:"اختر منتجًا لكل صف.", chooseCustomer:"اختر عميلًا.", chooseSupplier:"اختر موردًا.",
  invalidAmount:"أدخل مبلغًا صحيحًا أكبر من صفر.", lostReasonReq:"سبب الخسارة مطلوب لنقل العميل المحتمل إلى خاسر.",
  storageOff:"التخزين المحلي غير متاح في هذا المتصفح، لذا لن تُحفظ البيانات بعد إغلاق الصفحة. فعّل التخزين / ملفات تعريف الارتباط لهذا الموقع، أو صدّر نسخة احتياطية قبل المغادرة.",
  backupDone:"تم تنزيل النسخة الاحتياطية.", importDone:"تم استيراد النسخة الاحتياطية بنجاح.", importBad:"هذا الملف ليس نسخة احتياطية صالحة لـ Epsilon.",
  invoice:"فاتورة", quotation:"عرض سعر", terms:"شكرًا لتعاملكم معنا.", preparedBy:"أعدّها", signature:"التوقيع",
  opening:"افتتاحي", purchase:"شراء", sale:"بيع", saleCancel:"إلغاء بيع (عكس)", purchaseCancel:"إلغاء شراء (عكس)", adjustment:"تسوية",
  adjustStock:"تسوية المخزون", newQty:"الكمية الجديدة", reason:"السبب", leadWonMsg:"تم تعليم العميل المحتمل كفائز — وتم إنشاء سجل العميل.",
  today:"اليوم", thisMonth:"هذا الشهر", dueDate:"تاريخ الاستحقاق", description:"الوصف", value:"القيمة",
  stageNew:"عميل جديد", stageContacted:"تم التواصل", stageInterested:"مهتم", stageQualified:"مؤهل",
  stageQuotation:"أُرسل عرض السعر", stageNegotiation:"تفاوض", stageWon:"فائز", stageLost:"خاسر",
  moveBack:"السابق", moveNext:"التالي", setStatus:"تعيين الحالة", lead:"العميل المحتمل", forCustomer:"لـ (عميل أو عميل محتمل)",
  invoiceFor:"فاتورة", generalPayment:"دفعة عامة (غير مرتبطة بفاتورة)", payAgainst:"تطبيق على فاتورة",
  none:"— لا شيء —", langSaved:"تم حفظ اللغة.", userSwitched:"المستخدم الحالي:", openingBalNote:"الرصيد الافتتاحي المستحق عند البداية (موجب = عليهم لنا / علينا لهم).",
  qtySold:"الكمية المباعة", revenueCol:"الإيراد", profitCol:"الربح", empSales:"مبيعات الموظفين", custBalance:"أرصدة العملاء",
  totalDue:"إجمالي المستحق لنا", totalOwed:"إجمالي المستحق علينا", expByCat:"المصروفات حسب الفئة", stockValue:"قيمة المخزون",
  printBtn:"طباعة / حفظ PDF", backToApp:"رجوع", docFrom:"Epsilon", validUntil:"صالح حتى",
  createdBy:"أنشأها", historyFor:"السجل", noHistory:"لا توجد تغييرات مسجلة بعد.", wasPrice:"كان", nowPrice:"أصبح",
  openingStock:"المخزون الافتتاحي", addStockNote:"الكمية الموجودة فعليًا الآن. بعد ذلك تتغير الكمية من الفواتير والتسويات فقط.",
  leadValue:"قيمة الصفقة", contactName:"اسم جهة الاتصال", followNotePh:"ما حدث / الخطوة القادمة…", nextDate:"تاريخ المتابعة القادمة",
  reschedule:"حفظ المتابعة", quotationForLead:"تم إنشاء عرض السعر من العميل المحتمل", selectLeadCust:"اسم العميل / العميل المحتمل (نص حر إن كان جديدًا)",
  reportsSalesHead:"فواتير البيع في الفترة", totalSalesPeriod:"إجمالي مبيعات الفترة", totalCollectedPeriod:"متحصّل الفترة",
  expensesPeriod:"مصروفات الفترة", profitPeriod:"إجمالي ربح الفترة", count:"العدد", sku:"الصنف",
  cashFlowNote:"الأرصدة التالية محسوبة من كل دفعة ومصروف مسجل، حسب طريقة الدفع.",
  account:"الحساب", inFlow:"وارد", outFlow:"صادر", balanceNow:"الرصيد",
  commOnInvoice:"عمولة على فاتورة", totalCommissions:"إجمالي العمولات", paidCommissions:"العمولات المدفوعة", unpaidCommissions:"العمولات غير المدفوعة",
  removeItem:"حذف الصنف", searchByCustomer:"بحث باسم العميل", searchByProduct:"بحث بالصنف",
  profitByProduct:"مكسب الشركة حسب الصنف — إيه اللي اتباع أكتر", profitByProductNote:"ده مكسب الشركة من كل صنف (سعر البيع − سعر الشراء)، مش عمولات الموظفين. مترتب حسب الكمية المباعة، الأكبر الأول.",
  costCol:"إجمالي التكلفة", shareOfSales:"نسبته من الكمية المباعة", rateControl:"التحكم في نسبة العمولة", rateControlNote:"غيّر النسبة الافتراضية من هنا — هتتطبق على فواتير البيع الجديدة. ولو عايز تغيّر عمولة فاتورة معينة، عدّل نسبتها في الجدول تحت ودوس حفظ اللي جنبها؛ المبلغ هيتحسب من جديد من إجمالي الفاتورة.",
  saveRate:"حفظ النسبة", perCustomerTitle:"حسب العميل — كل عميل دفع كام", perSupplierTitle:"حسب المورد — دفعنا لكل مورد كام",
  ledgerTitle:"كل حركات الكاش والبنك (قابلة للبحث)", paymentsCount:"عدد الدفعات", lastPayment:"آخر دفعة", totalPaidIn:"الإجمالي المستلم",
  allMethods:"كل الطرق", stockQtyTitle:"كميات المخزون", dataSavedNote:"بياناتك بتتحفظ تلقائيًا على الجهاز ده بعد كل تعديل — مش هتحتاج تسجلها من الأول.",
  finPeriod:"أرقام إجمالية لكل الفترات (الفواتير الملغاة مستبعدة).", leadsPipeline:"خط الصفقات", leadsList:"كل العملاء المحتملين (قائمة)",
  searchPh:"اكتب للتصفية…", filter:"تصفية", reset:"إعادة تعيين", yes:"نعم", no:"لا", egp:"ج.م",
  errGeneric:"حدث خطأ ما. لم تتغير بياناتك المحفوظة.", reload:"إعادة تحميل الصفحة",
  stockAfter:"المخزون بعد", change:"التغيير", unitCost:"تكلفة الوحدة", lineTotal:"إجمالي السطر",
  subtotal:"المجموع الفرعي", grandTotal:"الإجمالي النهائي", invoiceDate:"تاريخ الفاتورة", due:"المستحق",
  payNow:"المبلغ المدفوع الآن", payMethod:"طريقة الدفع", itemsRequired:"أضف صنفًا واحدًا على الأقل بكمية أكبر من صفر.",
  customerStatement:"كشف حساب عميل", supplierStatement:"كشف حساب مورد", debit:"مدين", credit:"دائن", running:"الرصيد الجاري",
  txSale:"فاتورة بيع", txPurchase:"فاتورة شراء", txPaymentIn:"دفعة مستلمة", txPaymentOut:"دفعة مدفوعة", txOpening:"رصيد افتتاحي", txCancelled:"(ملغاة)",
  commissionFor:"عمولة — فاتورة", settingsSaved:"تم حفظ الإعدادات.", demoLoaded:"تم تحميل البيانات التجريبية.", demoCleared:"تم مسح البيانات التجريبية.",
  allCleared:"تم مسح كل البيانات. التطبيق يبدأ فارغًا من جديد (المستخدمون باقون).", selectFile:"اختر ملف النسخة الاحتياطية", usersListNote:"كل شخص بيسجّل دخول باسم المستخدم وكلمة المرور بتوعه. لتبديل الحساب، سجّل خروج وسجّل دخول بالحساب التاني.",
  roleAdminDesc:"صلاحية كاملة لكل الأقسام، بما فيها المصروفات والحسابات المالية وسجل النشاط والإعدادات.", roleSalesDesc:"عمل المبيعات فقط: لوحة التحكم (بدون صافي الربح)، المنتجات، المخزون، الفواتير، العملاء، الموردون، المدفوعات، العمولات، الحسابات، إدارة العملاء، عروض الأسعار والتقارير.",
  permDenied:"دورك لا يسمح بالوصول إلى هذا القسم.", moveStage:"نقل", addFollow:"تسجيل متابعة",
  leadStageChanged:"تم تحديث المرحلة.", quotationSaved:"تم حفظ عرض السعر.", convertedOk:"تم تحويل عرض السعر إلى فاتورة بيع.",
  alreadyConverted:"تم تحويل عرض السعر هذا من قبل.", adjustDone:"تمت تسوية المخزون.", priceUpdated:"تم تحديث السعر وتسجيله في السجل.",
  expenseCats:"إيجار، رواتب، نقل، مرافق، تسويق، صيانة، أخرى", leadSources:"إحالة، موقع إلكتروني، وسائل التواصل، مكالمة هاتفية، زيارة، معرض، أخرى",
  productCats:"محركات، مضخات، كابلات، لوحات تحكم، مولدات، قطع غيار، أدوات، أخرى",
  demoTag:"تجريبي", editProduct:"تعديل منتج", editCustomer:"تعديل عميل", editSupplier:"تعديل مورد", editLead:"تعديل عميل محتمل", editExpense:"تعديل مصروف",
  invoiceItems:"أصناف الفاتورة", openInvoices:"الفواتير المفتوحة", noOpenInvoices:"لا توجد فواتير مفتوحة.", totalPaid:"إجمالي المدفوع", ofTotal:"من",
  viewStatement:"كشف الحساب", hideStatement:"إخفاء كشف الحساب", perms:"الصلاحيات",
  searchByNamePhone:"بحث بالاسم أو رقم الهاتف", searchCustPh:"اكتب الاسم أو رقم الهاتف…",
  searchInvoiceTitle:"بحث في فواتير البيع", searchInvoicePh:"رقم الفاتورة أو اسم العميل أو رقم الهاتف…",
  results:"نتيجة", totalOfResults:"إجمالي النتائج",
  balCustOwes:"عليه لينا — لسه هيتدفع منه", balCustCredit:"علينا ليه — دفع زيادة (له عندنا)",
  balSuppWeOwe:"علينا للمورد — لسه هندفعله", balSuppCredit:"لينا عند المورد — دفعنا زيادة",
  balSettled:"خالص — مفيش مستحقات",
  totalBilled:"إجمالي الفواتير (اللي عليه)", totalHePaid:"إجمالي اللي دفعه", stillOwesLbl:"لسه عليه",
  totalBought:"إجمالي المشتريات (اللي علينا)", totalWePaid:"إجمالي اللي دفعناه", stillWeOweLbl:"لسه علينا",
  recordedBy:"سجلها (المستخدم)", unknownRecorder:"غير مسجل (قيد قديم)",
  paymentHistory:"الدفعات — دفع إمتى ومين سجلها", invoicesPayStatus:"الفواتير وحالة سدادها",
  payThisInvoice:"تسجيل دفعة",
  stmtExplainCust:"ببساطة: «مدين» = فواتير بيع عليه لينا. «دائن» = فلوس دفعها. الرصيد الجاري = اللي لسه عليه.",
  stmtExplainSupp:"ببساطة: «مدين» = فواتير شراء علينا للمورد. «دائن» = فلوس دفعناها له. الرصيد الجاري = اللي لسه علينا.",
  debitCust:"مدين (عليه — فواتير)", creditCust:"دائن (دفع)",
  debitSupp:"مدين (علينا — فواتير شراء)", creditSupp:"دائن (دفعنا)",
  overpayInfo:"لو المبلغ أكبر من المتبقي على الفاتورة، الزيادة بتتحفظ رصيد في حسابه وبتظهر في كشف حسابه.",
  invPayInfo:"إجمالي الفاتورة / المدفوع قبل كده / المتبقي",
  payGroupedCust:"المدفوعات مصنفة حسب العميل", payGroupedSupp:"المدفوعات مصنفة حسب المورد",
  allDirections:"الكل (وارد وصادر)", finPeriodLbl:"أرقام الفترة المختارة", finByMonth:"التصنيف حسب الشهر", finByDate:"التصنيف حسب التاريخ (حركة الكاش)",
  finAllTime:"الإجمالي الكلي (كل الفترات)", salesCol:"المبيعات", collectedCol:"المحصّل", paidOutCol:"المدفوع للموردين",
  cashNet:"صافي حركة الكاش", monthCol:"الشهر", overpaidStatus:"مدفوعة + زيادة"
}};
function t(k){ var L=(DB&&DB.settings.lang)||"en"; return (T[L]&&T[L][k])||T.en[k]||k; }
function lang(){ return (DB&&DB.settings.lang)||"en"; }

/* ---------------- State ---------------- */
function blankState(){
  return {
    v:1,
    settings:{ lang:"en", userId:"u1", commissionPct:5, allowNegative:false },
    users:[
      {id:"u1", name:"Mohamed (Admin)", username:"admin", passwordHash:"", role:"admin", active:true, phone:"", email:""},
      {id:"u2", name:"Sales Employee 1", username:"sales1", passwordHash:"", role:"sales", active:true, phone:"", email:""},
      {id:"u3", name:"Sales Employee 2", username:"sales2", passwordHash:"", role:"sales", active:true, phone:"", email:""}
    ],
    products:[], customers:[], suppliers:[],
    salesInvoices:[], purchaseInvoices:[], payments:[], expenses:[],
    commissions:[], leads:[], quotations:[], movements:[], activity:[],
    counters:{ sales:1001, purchase:5001, quote:2001 }
  };
}
var DB = blankState();
/* ---------------- Passwords & sign-in session ----------------
   Passwords are stored only as a one-way hash. There is NO sign-up
   anywhere in the app: accounts (username + password) are created
   by an admin from the Users section only. */
function hashPw(s){
  var h=5381; var str="eps::"+String(s==null?"":s);
  for(var i=0;i<str.length;i++){ h=((h<<5)+h+str.charCodeAt(i))|0; }
  return "h"+(h>>>0).toString(36)+"."+str.length;
}
var SESSION_KEY = "epsilon_session_v1";
function sessionUserId(){
  try{ return sessionStorage.getItem(SESSION_KEY)||""; }catch(e){ return window._epsSess||""; }
}
function setSession(id){
  window._epsSess=id||"";
  try{ if(id) sessionStorage.setItem(SESSION_KEY,id); else sessionStorage.removeItem(SESSION_KEY); }catch(e){}
}
function findByUsername(un){
  var needle=String(un||"").trim().toLowerCase(); if(!needle) return null;
  return DB.users.find(function(u){ return String(u.username||"").trim().toLowerCase()===needle; }) || null;
}
function loggedUser(){
  var id=sessionUserId(); if(!id) return null;
  var u=DB.users.find(function(x){ return x.id===id; });
  if(!u || u.active===false) return null;
  return u;
}
function checkPassword(u, pw){
  if(!u) return false;
  if(u.passwordHash) return hashPw(pw)===u.passwordHash;
  if(u.password) return String(pw)===String(u.password);
  return false;
}
/* Give every stored user a username (older data had none). Passwords are
   NEVER defaulted: a user without a passwordHash cannot sign in until the
   owner sets a password — for the admin that happens in the first-run
   setup screen, for everyone else in the Users section. */
function normalizeUsers(){
  var used={};
  DB.users.forEach(function(u){
    var base=String(u.username||"").trim().toLowerCase();
    if(!base){
      if(u.id==="u1"||u.role==="admin") base="admin";
      else if(u.id==="u2") base="sales1";
      else if(u.id==="u3") base="sales2";
      else base=String(u.name||"user").toLowerCase().replace(/[^a-z0-9]+/g,"").slice(0,14)||"user";
    }
    var cand=base, n=2;
    while(used[cand]){ cand=base+n; n++; }
    used[cand]=1; u.username=cand;
    if(!u.passwordHash){
      if(u.password){ u.passwordHash=hashPw(u.password); delete u.password; }
      else u.passwordHash="";
    }
    if(u.active===undefined) u.active=true;
  });
  if(!DB.users.some(function(u){ return u.id===DB.settings.userId; }) && DB.users.length) DB.settings.userId=DB.users[0].id;
}
function needsSetup(){
  return !DB.users.some(function(u){ return u.role==="admin" && u.passwordHash; });
}
function firstAdmin(){
  return DB.users.find(function(u){ return u.role==="admin"; }) || DB.users[0];
}
function load(){
  if(!storageOK){ normalizeUsers(); return; }
  try{
    var raw = localStorage.getItem(LS_KEY);
    if(raw){ var parsed = JSON.parse(raw); if(parsed && parsed.v===1 && parsed.users){ DB = parsed; } }
  }catch(e){ /* corrupted storage: start empty rather than blank-screen */ DB = blankState(); }
  normalizeUsers();
}
function save(){
  if(!storageOK) return;
  try{ localStorage.setItem(LS_KEY, JSON.stringify(DB)); }catch(e){ /* quota etc: keep app alive */ }
}
function uid(p){ return p + "_" + Date.now().toString(36) + Math.random().toString(36).slice(2,8); }
function todayStr(){ var d=new Date(); return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0"); }
function nowStr(){ var d=new Date(); return d.toLocaleDateString(lang()==="ar"?"ar-EG":"en-GB")+" "+d.toLocaleTimeString(lang()==="ar"?"ar-EG":"en-GB",{hour:"2-digit",minute:"2-digit"}); }
function esc(s){ return String(s==null?"":s).replace(/[&<>"']/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c];}); }
function num(v){ var n=parseFloat(v); return isNaN(n)?0:n; }
function money(v){ var n=num(v); return n.toLocaleString(lang()==="ar"?"ar-EG":"en-US",{minimumFractionDigits:2,maximumFractionDigits:2})+" "+t("egp"); }
function fmtN(v){ return num(v).toLocaleString(lang()==="ar"?"ar-EG":"en-US",{maximumFractionDigits:2}); }
function me(){ return loggedUser() || DB.users.find(function(u){return u.id===DB.settings.userId;}) || DB.users[0]; }
function isAdmin(){ var u=loggedUser(); return !!(u && u.role==="admin"); }
function userName(id){ var u=DB.users.find(function(x){return x.id===id;}); return u?u.name:"—"; }
function logAct(action, detail){
  DB.activity.unshift({ id:uid("a"), ts:nowStr(), user:me()?me().name:"?", action:action, detail:detail||"" });
  if(DB.activity.length>800) DB.activity.length=800;
}
function toast(msg){
  var el=document.getElementById("toast"); el.textContent=msg; el.style.display="block";
  clearTimeout(toast._h); toast._h=setTimeout(function(){ el.style.display="none"; },2600);
}

/* ---------------- Lookups & calculations ---------------- */
function productById(id){ return DB.products.find(function(p){return p.id===id;}); }
function customerById(id){ return DB.customers.find(function(c){return c.id===id;}); }
function supplierById(id){ return DB.suppliers.find(function(s){return s.id===id;}); }
function invoicePaid(inv){ return DB.payments.filter(function(p){return !p.voided && p.invoiceId===inv.id;}).reduce(function(s,p){return s+num(p.amount);},0); }
function invStatus(inv){
  if(inv.status==="cancelled") return "cancelled";
  var paid=invoicePaid(inv);
  if(paid>=num(inv.total)-0.001 && num(inv.total)>0) return "paid";
  if(paid>0) return "partial";
  return "unpaid";
}
function customerBalance(cid){
  var c=customerById(cid); var bal=c?num(c.openingBalance):0;
  DB.salesInvoices.forEach(function(inv){ if(inv.customerId===cid && inv.status!=="cancelled") bal+=num(inv.total); });
  DB.payments.forEach(function(p){ if(!p.voided && p.dir==="in" && p.partyId===cid) bal-=num(p.amount); });
  return bal;
}
function supplierBalance(sid){
  var s=supplierById(sid); var bal=s?num(s.openingBalance):0;
  DB.purchaseInvoices.forEach(function(inv){ if(inv.supplierId===sid && inv.status!=="cancelled") bal+=num(inv.total); });
  DB.payments.forEach(function(p){ if(!p.voided && p.dir==="out" && p.partyId===sid) bal-=num(p.amount); });
  return bal;
}
function moveStock(productId, change, type, ref){
  var p=productById(productId); if(!p) return;
  p.qty = num(p.qty)+change;
  DB.movements.unshift({ id:uid("m"), date:todayStr(), productId:productId, productName:p.name, change:change, after:num(p.qty), type:type, ref:ref||"", by:me().name });
}
function salesTotals(){
  var rev=0,cogs=0;
  DB.salesInvoices.forEach(function(inv){ if(inv.status==="cancelled") return; rev+=num(inv.total);
    inv.items.forEach(function(it){ cogs+=num(it.qty)*num(it.cost); }); });
  return {revenue:rev, cogs:cogs, gross:rev-cogs};
}
function expensesTotal(){ return DB.expenses.reduce(function(s,e){return s+num(e.amount);},0); }
function commissionsPaidTotal(){ return DB.commissions.filter(function(c){return c.paid;}).reduce(function(s,c){return s+num(c.amount);},0); }
function netProfit(){ var st=salesTotals(); return st.gross - expensesTotal() - commissionsPaidTotal(); }
function collectedTotal(){ return DB.payments.filter(function(p){return !p.voided && p.dir==="in";}).reduce(function(s,p){return s+num(p.amount);},0); }
function receivablesTotal(){ return DB.customers.reduce(function(s,c){ var b=customerBalance(c.id); return s+(b>0?b:0); },0); }
function payablesTotal(){ return DB.suppliers.reduce(function(s,x){ var b=supplierBalance(x.id); return s+(b>0?b:0); },0); }
function inventoryValue(){ return DB.products.reduce(function(s,p){return s+num(p.qty)*num(p.cost);},0); }
function lowStockList(){ return DB.products.filter(function(p){return num(p.qty)<=num(p.minStock);}); }
/* Arabic-friendly search normalisation (ة/ه, ى/ي, إ/ا, diacritics) so name
   search works however the name was typed. */
function normS(s){ return String(s==null?"":s).toLowerCase().replace(/[ً-ٰٟ]/g,"").replace(/ة/g,"ه").replace(/ى/g,"ي").replace(/[إأآ]/g,"ا").replace(/\s+/g," ").trim(); }
function payRecorder(p){
  if(p && p.createdByName) return p.createdByName;
  if(p && p.createdById){ var n=userName(p.createdById); if(n && n!=="—") return n; }
  return t("unknownRecorder");
}
/* Plain-language balance: says clearly whether the money is لينا or علينا. */
function balanceHtml(kind, bal){
  bal=num(bal);
  if(Math.abs(bal)<0.005) return money(0)+'<br><span class="pill grey">'+esc(t("balSettled"))+'</span>';
  var label, cls;
  if(kind==="customer"){ if(bal>0){ label=t("balCustOwes"); cls="warn"; } else { label=t("balCustCredit"); cls="info"; } }
  else { if(bal>0){ label=t("balSuppWeOwe"); cls="warn"; } else { label=t("balSuppCredit"); cls="info"; } }
  return '<strong>'+money(Math.abs(bal))+'</strong><br><span class="pill '+cls+'">('+esc(label)+')</span>';
}
function partyTotals(kind, id){
  var invList=(kind==="customer"?DB.salesInvoices:DB.purchaseInvoices).filter(function(inv){
    return (kind==="customer"?inv.customerId:inv.supplierId)===id && inv.status!=="cancelled"; });
  var invoiced=invList.reduce(function(s,inv){return s+num(inv.total);},0);
  var pays=DB.payments.filter(function(p){ return !p.voided && p.partyId===id && p.dir===(kind==="customer"?"in":"out"); });
  var paid=pays.reduce(function(s,p){return s+num(p.amount);},0);
  var last=""; pays.forEach(function(p){ if(!last||p.date>last) last=p.date; });
  return { invoiced:invoiced, paid:paid, invCount:invList.length, payCount:pays.length, lastPay:last, pays:pays, invList:invList };
}

/* ---------------- UI state & navigation ---------------- */
var ui = { view:"dashboard", search:"", lowOnly:false, stmtCustomer:null, stmtSupplier:null,
  repType:"sales", repFrom:"", repTo:"", leadView:"kanban", histProduct:null,
  invSearch:"", invLowOnly:false, paySearch:"", commSearch:"", commProdSearch:"", accSearch:"", accMethod:"",
  custSearch:"", suppSearch:"", salesSearch:"", payFrom:"", payTo:"", payDir:"", finFrom:"", finTo:"" };
var ADMIN_ONLY = { expenses:1, financials:1, activity:1, settings:1, users:1 };
var NAV = [
  {sec:"secMain", items:[["dashboard"]]},
  {sec:"secSales", items:[["products"],["inventory"],["sales"],["purchases"]]},
  {sec:"secMoney", items:[["customers"],["suppliers"],["payments"],["expenses"],["commissions"],["accounts"],["financials"]]},
  {sec:"secCrm", items:[["crm"],["followups"],["quotations"]]},
  {sec:"secAdmin", items:[["reports"],["activity"],["users"],["settings"]]}
];
function canSee(view){ return isAdmin() || !ADMIN_ONLY[view]; }
function go(view){
  if(!canSee(view)){ toast(t("permDenied")); view="dashboard"; }
  ui.view=view;
  document.getElementById("sideNav").classList.remove("open");
  render();
  var m=document.getElementById("app"); if(m) m.focus({preventScroll:true});
  window.scrollTo(0,0);
}
function renderNav(){
  var html="";
  NAV.forEach(function(group){
    var items=group.items.filter(function(it){ return canSee(it[0]); });
    if(!items.length) return;
    html+='<div class="navsec">'+esc(t(group.sec))+'</div>';
    items.forEach(function(it){
      var v=it[0]; var badge="";
      if(v==="inventory" && lowStockList().length) badge=' <span class="badge">'+lowStockList().length+'</span>';
      if(v==="followups"){ var n=followDueCount(); if(n) badge=' <span class="badge">'+n+'</span>'; }
      html+='<button type="button" class="navitem'+(ui.view===v?" active":"")+'" data-go="'+v+'">'+esc(t(v))+badge+'</button>';
    });
  });
  document.getElementById("sideNav").innerHTML=html;
}
function followDueCount(){
  var td=todayStr(); var n=0;
  DB.leads.forEach(function(l){ if(l.stage!=="Won"&&l.stage!=="Lost"&&l.nextFollow&&l.nextFollow<=td) n++; });
  return n;
}
function showAuthForm(which){
  document.getElementById("loginScreen").style.display="flex";
  document.getElementById("appShell").style.display="none";
  document.getElementById("loginForm").style.display=which==="login"?"":"none";
  document.getElementById("setupForm").style.display=which==="setup"?"":"none";
  document.getElementById("changeForm").style.display=which==="change"?"":"none";
}
function renderLogin(){
  showAuthForm("login");
  document.getElementById("loginLangBtn").textContent=t("langName");
  document.getElementById("loginTitle").textContent=t("loginWelcome");
  document.getElementById("loginSub").textContent=t("loginSub");
  document.getElementById("loginUserLabel").textContent=t("username");
  document.getElementById("loginPassLabel").textContent=t("password");
  document.getElementById("loginBtn").textContent=t("login");
  document.getElementById("noSignupNote").textContent=t("noSignup");
  document.getElementById("deviceNote").textContent=t("deviceNote");
}
function renderSetup(){
  showAuthForm("setup");
  var a=firstAdmin();
  document.getElementById("setupTitle").textContent=t("setupTitle");
  document.getElementById("setupSub").textContent=t("setupSub");
  document.getElementById("setupUserLabel").textContent=t("username");
  document.getElementById("setupPassLabel").textContent=t("password");
  document.getElementById("setupPass2Label").textContent=t("confirmPassword");
  document.getElementById("setupBtn").textContent=t("setupBtn");
  document.getElementById("setupNoSignup").textContent=t("noSignup");
  var un=document.getElementById("setupUser");
  if(a && !un.value) un.value=a.username||"admin";
}
var pendingChangeUserId="";
function renderChange(){
  showAuthForm("change");
  document.getElementById("changeTitle").textContent=t("changeTitle");
  document.getElementById("changeSub").textContent=t("changeSub");
  document.getElementById("changePassLabel").textContent=t("newPassword");
  document.getElementById("changePass2Label").textContent=t("confirmPassword");
  document.getElementById("changeBtn").textContent=t("changeBtn");
}
function authError(id,msg){
  var e=document.getElementById(id);
  e.textContent=msg; e.classList.add("show");
}
function loginError(msg){ authError("loginErr",msg); }
function completeSignIn(u){
  pendingChangeUserId="";
  setSession(u.id);
  DB.settings.userId=u.id;
  logAct("login","Sign in: "+u.name);
  save();
  if(!canSee(ui.view)) ui.view="dashboard";
  render();
  toast(t("signedInAs")+" "+u.name);
}
function doLogin(){
  var un=document.getElementById("loginUser").value;
  var pw=document.getElementById("loginPass").value;
  var u=findByUsername(un);
  if(!u || !checkPassword(u,pw)){ loginError(t("loginError")); return; }
  if(u.active===false){ loginError(t("loginInactive")); return; }
  document.getElementById("loginErr").classList.remove("show");
  document.getElementById("loginPass").value="";
  if(u.mustChange){ pendingChangeUserId=u.id; renderChange(); return; }
  completeSignIn(u);
}
function doSetup(){
  var a=firstAdmin(); if(!a) return;
  var un=document.getElementById("setupUser").value.trim().toLowerCase();
  var pw=document.getElementById("setupPass").value;
  var pw2=document.getElementById("setupPass2").value;
  if(!un){ authError("setupErr",t("required")+" ("+t("username")+")"); return; }
  var clash=DB.users.find(function(u){ return String(u.username||"").toLowerCase()===un && u.id!==a.id; });
  if(clash){ authError("setupErr",t("usernameTaken")); return; }
  if(pw.length<4){ authError("setupErr",t("passwordMin")); return; }
  if(pw!==pw2){ authError("setupErr",t("passMismatch")); return; }
  document.getElementById("setupErr").classList.remove("show");
  a.username=un; a.passwordHash=hashPw(pw); a.mustChange=false; a.active=true;
  logAct("setup","Admin account set up: "+a.name);
  save();
  document.getElementById("setupPass").value=""; document.getElementById("setupPass2").value="";
  completeSignIn(a);
}
function doChangePassword(){
  var u=DB.users.find(function(x){ return x.id===pendingChangeUserId; });
  if(!u){ renderLogin(); return; }
  var pw=document.getElementById("changePass").value;
  var pw2=document.getElementById("changePass2").value;
  if(pw.length<4){ authError("changeErr",t("passwordMin")); return; }
  if(pw!==pw2){ authError("changeErr",t("passMismatch")); return; }
  document.getElementById("changeErr").classList.remove("show");
  u.passwordHash=hashPw(pw); u.mustChange=false;
  logAct("edit","Password set by user: "+u.name);
  save();
  document.getElementById("changePass").value=""; document.getElementById("changePass2").value="";
  completeSignIn(u);
}
function doLogout(){
  var u=loggedUser();
  if(u) logAct("logout","Sign out: "+u.name);
  save();
  setSession("");
  render();
}
function render(){
  try{
    document.documentElement.lang = lang();
    document.documentElement.dir = t("dir");
    if(needsSetup()){ renderSetup(); return; }
    var lu=loggedUser();
    if(!lu){ renderLogin(); return; }
    document.getElementById("loginScreen").style.display="none";
    document.getElementById("appShell").style.display="";
    document.getElementById("langBtn").textContent = t("langName");
    document.getElementById("logoutBtn").textContent = t("logout");
    document.getElementById("currentUserChip").textContent = lu.name+" — "+(lu.role==="admin"?t("admin"):t("salesRole"));
    renderNav();
    var app=document.getElementById("app");
    var warn = storageOK ? "" : '<div class="errorbox"><strong>'+esc(t("storageOff"))+'</strong></div>';
    var VIEWS={ dashboard:vDashboard, products:vProducts, inventory:vInventory, sales:vSales, purchases:vPurchases,
      customers:vCustomers, suppliers:vSuppliers, payments:vPayments, expenses:vExpenses, commissions:vCommissions,
      accounts:vAccounts, financials:vFinancials, crm:vCrm, followups:vFollowups, quotations:vQuotations,
      reports:vReports, activity:vActivity, users:vUsers, settings:vSettings };
    app.innerHTML = warn + (VIEWS[ui.view] ? VIEWS[ui.view]() : vDashboard());
  }catch(err){
    document.getElementById("app").innerHTML = '<div class="errorbox"><strong>'+esc(t("errGeneric"))+'</strong><br><br><button class="btn" onclick="location.reload()">'+esc(t("reload"))+'</button></div>';
  }
}

/* ---------------- Modal & confirm ---------------- */
function openModal(title, bodyHtml, footHtml, wide){
  var root=document.getElementById("modalRoot");
  root.innerHTML='<div class="overlay" id="ovl"><div class="modal'+(wide?" wide":"")+'" role="dialog" aria-modal="true">'
    +'<h2>'+esc(title)+'</h2><div>'+bodyHtml+'</div>'
    +'<div class="formerr" id="formErr"></div>'
    +'<div class="mfoot">'+(footHtml||"")+'<button type="button" class="btn secondary" data-close="1">'+esc(t("close"))+'</button></div>'
    +'</div></div>';
  document.getElementById("ovl").addEventListener("mousedown",function(e){ if(e.target.id==="ovl") closeModal(); });
  root.querySelectorAll("label.fl").forEach(function(lab,i){
    var el=lab.nextElementSibling;
    if(el && /^(INPUT|SELECT|TEXTAREA)$/.test(el.tagName)){
      if(!el.id) el.id="fld_"+i+"_"+Date.now().toString(36);
      lab.setAttribute("for",el.id);
      el.setAttribute("aria-label",lab.textContent.replace(/\s*\*\s*$/,"").trim());
    }
  });
}
function closeModal(){ document.getElementById("modalRoot").innerHTML=""; }
function formError(msg){ var e=document.getElementById("formErr"); if(e){ e.textContent=msg; e.classList.add("show"); } }
function confirmModal(msg, btnLabel, onYes){
  openModal(t("confirmDelete")===""?"":(btnLabel||t("delete")), '<p>'+esc(msg)+'</p>',
    '<button type="button" class="btn danger" id="cfYes">'+esc(btnLabel||t("delete"))+'</button>');
  document.querySelector(".modal h2").textContent = "Epsilon";
  document.getElementById("cfYes").addEventListener("click",function(){ closeModal(); onYes(); });
}
function fld(label, inner){ return '<label class="fl">'+esc(label)+'</label>'+inner; }
function inp(id, val, type, extra){ return '<input id="'+id+'" type="'+(type||"text")+'" value="'+esc(val==null?"":val)+'" '+(extra||"")+'>'; }
function selOpts(list, val, includeNone){
  var h = includeNone ? '<option value="">'+esc(t("none"))+'</option>' : "";
  list.forEach(function(o){ h+='<option value="'+esc(o.v)+'"'+(String(o.v)===String(val)?" selected":"")+'>'+esc(o.l)+'</option>'; });
  return h;
}
function download(filename, content, mime){
  var blob=new Blob([content],{type:mime||"text/plain;charset=utf-8"});
  var a=document.createElement("a"); a.href=URL.createObjectURL(blob); a.download=filename;
  document.body.appendChild(a); a.click(); setTimeout(function(){ URL.revokeObjectURL(a.href); a.remove(); },300);
}
function toCsv(rows){
  return rows.map(function(r){ return r.map(function(c){ var s=String(c==null?"":c); return /[",\n]/.test(s)?'"'+s.replace(/"/g,'""')+'"':s; }).join(","); }).join("\r\n");
}
function exportCsv(name, rows){ download(name+".csv", "\ufeff"+toCsv(rows), "text/csv;charset=utf-8"); toast(t("backupDone")); }

/* ---------------- Dashboard ---------------- */
function vDashboard(){
  var td=todayStr(), month=td.slice(0,7);
  var sToday=0,sMonth=0;
  DB.salesInvoices.forEach(function(inv){ if(inv.status==="cancelled") return;
    if(inv.date===td) sToday+=num(inv.total); if((inv.date||"").slice(0,7)===month) sMonth+=num(inv.total); });
  var st=salesTotals(); var low=lowStockList();
  var byProd={};
  DB.salesInvoices.forEach(function(inv){ if(inv.status==="cancelled") return;
    inv.items.forEach(function(it){ byProd[it.name]=byProd[it.name]||{qty:0,rev:0}; byProd[it.name].qty+=num(it.qty); byProd[it.name].rev+=num(it.qty)*num(it.price); }); });
  var top=Object.keys(byProd).map(function(k){return {name:k,qty:byProd[k].qty,rev:byProd[k].rev};}).sort(function(a,b){return b.qty-a.qty;}).slice(0,5);
  var byEmp={};
  DB.salesInvoices.forEach(function(inv){ if(inv.status==="cancelled") return; var n=userName(inv.employeeId); byEmp[n]=(byEmp[n]||0)+num(inv.total); });
  var empRows=Object.keys(byEmp).map(function(k){return {name:k,total:byEmp[k]};}).sort(function(a,b){return b.total-a.total;});
  var h='<h1>'+esc(t("dashboard"))+'</h1><div class="sub">Epsilon — '+esc(nowStr())+'</div>';
  h+='<div class="cards">'
    +kpi(t("salesToday"),money(sToday))+kpi(t("salesMonth"),money(sMonth))
    +kpi(t("collected"),money(collectedTotal()))+kpi(t("outstanding"),money(receivablesTotal()))
    +kpi(t("invValue"),money(inventoryValue()))+kpi(t("lowStock"),fmtN(low.length))
    +kpi(t("grossProfit"),money(st.gross));
  if(isAdmin()) h+=kpi(t("totalExpenses"),money(expensesTotal()))+kpi(t("netProfit"),money(netProfit()));
  h+='</div>';
  if(low.length){
    h+='<div class="alertbox"><strong>'+esc(t("lowStock"))+':</strong> '+low.map(function(p){return esc(p.name)+" ("+fmtN(p.qty)+")";}).join(" · ")+'</div>';
  }
  h+='<h2>'+esc(t("topProducts"))+'</h2>';
  if(top.length){
    h+='<div class="tablewrap"><table><tr><th>'+esc(t("product"))+'</th><th class="num">'+esc(t("qtySold"))+'</th><th class="num">'+esc(t("revenueCol"))+'</th></tr>'
      +top.map(function(r){return '<tr><td class="wrapcell">'+esc(r.name)+'</td><td class="num">'+fmtN(r.qty)+'</td><td class="num">'+money(r.rev)+'</td></tr>';}).join("")+'</table></div>';
  } else h+='<div class="empty">'+esc(t("noData"))+'</div>';
  h+='<h2>'+esc(t("salesByEmp"))+'</h2>';
  if(empRows.length){
    h+='<div class="tablewrap"><table><tr><th>'+esc(t("employee"))+'</th><th class="num">'+esc(t("total"))+'</th></tr>'
      +empRows.map(function(r){return '<tr><td class="wrapcell">'+esc(r.name)+'</td><td class="num">'+money(r.total)+'</td></tr>';}).join("")+'</table></div>';
  } else h+='<div class="empty">'+esc(t("noData"))+'</div>';
  return h;
}
function kpi(k,v){ return '<div class="kpi"><div class="k">'+esc(k)+'</div><div class="v">'+v+'</div></div>'; }

/* ---------------- Products ---------------- */
function vProducts(){
  var q=ui.search.toLowerCase();
  var list=DB.products.filter(function(p){
    if(ui.lowOnly && !(num(p.qty)<=num(p.minStock))) return false;
    if(q && (p.name+" "+(p.category||"")+" "+(p.brand||"")+" "+(p.model||"")).toLowerCase().indexOf(q)<0) return false;
    return true;
  });
  var h='<h1>'+esc(t("products"))+'</h1><div class="sub">'+esc(t("addStockNote"))+'</div>';
  h+='<div class="toolbar"><div class="fld grow"><label>'+esc(t("search"))+'</label><input id="prodSearch" value="'+esc(ui.search)+'" placeholder="'+esc(t("searchPh"))+'"></div>'
    +'<div class="fld"><label>'+esc(t("filter"))+'</label><select id="lowSel"><option value="">'+esc(t("all"))+'</option><option value="1"'+(ui.lowOnly?" selected":"")+'>'+esc(t("lowOnly"))+'</option></select></div>'
    +'<button class="btn" data-act="product-new">'+esc(t("addProduct"))+'</button>'
    +'<button class="btn secondary" data-act="csv" data-mod="products">'+esc(t("exportCsv"))+'</button></div>';
  if(ui.histProduct){ var hp=productById(ui.histProduct); if(hp) h+=priceHistoryHtml(hp); }
  if(!list.length) return h+'<div class="empty">'+esc(t("noData"))+'</div>';
  h+='<div class="tablewrap"><table><tr><th>'+esc(t("name"))+'</th><th>'+esc(t("category"))+'</th><th>'+esc(t("brand"))+' / '+esc(t("model"))+'</th>'
    +'<th class="num">'+esc(t("purchaseCost"))+'</th><th class="num">'+esc(t("sellingPrice"))+'</th><th class="num">'+esc(t("margin"))+'</th>'
    +'<th class="num">'+esc(t("stock"))+'</th><th>'+esc(t("supplier"))+'</th><th>'+esc(t("actions"))+'</th></tr>';
  list.forEach(function(p){
    var sup=supplierById(p.supplierId); var low=num(p.qty)<=num(p.minStock);
    var margin=num(p.cost)>0?(((num(p.price)-num(p.cost))/num(p.cost))*100).toFixed(1)+"%":"—";
    h+='<tr><td class="wrapcell"><strong>'+esc(p.name)+'</strong>'+(p.demo?' <span class="pill warn">'+esc(t("demoTag"))+'</span>':'')+(p.notes?'<br><small style="color:var(--muted)">'+esc(p.notes)+'</small>':'')+'</td>'
      +'<td>'+esc(p.category||"—")+'</td><td>'+esc([p.brand,p.model].filter(Boolean).join(" / ")||"—")+'</td>'
      +'<td class="num">'+money(p.cost)+'</td><td class="num">'+money(p.price)+'</td><td class="num">'+margin+'</td>'
      +'<td class="num">'+fmtN(p.qty)+(low?' <span class="pill bad">'+esc(t("lowStock"))+'</span>':'')+'<br><small style="color:var(--muted)">'+esc(t("minStock"))+': '+fmtN(p.minStock)+'</small></td>'
      +'<td>'+esc(sup?sup.name:"—")+'</td>'
      +'<td><div class="rowflex" style="gap:6px;flex-wrap:nowrap">'
      +'<button class="btn secondary small" data-act="product-edit" data-id="'+p.id+'">'+esc(t("edit"))+'</button>'
      +'<button class="btn secondary small" data-act="product-adjust" data-id="'+p.id+'">'+esc(t("adjustStock"))+'</button>'
      +'<button class="btn secondary small" data-act="product-hist" data-id="'+p.id+'">'+esc(t("priceHistory"))+'</button>'
      +'<button class="btn danger small" data-act="product-del" data-id="'+p.id+'">'+esc(t("delete"))+'</button>'
      +'</div></td></tr>';
  });
  return h+'</table></div>';
}
function priceHistoryHtml(p){
  var h='<div class="okbox"><strong>'+esc(t("priceHistory"))+' — '+esc(p.name)+'</strong>';
  if(!p.priceHistory||!p.priceHistory.length) h+='<br>'+esc(t("noHistory"));
  else h+='<br>'+p.priceHistory.slice().reverse().map(function(x){ return esc(x.date)+' — '+esc(x.by)+': '+esc(t("wasPrice"))+' '+money(x.from)+' → '+esc(t("nowPrice"))+' '+money(x.to); }).join("<br>");
  return h+'</div>';
}
function productForm(p){
  var isNew=!p; p=p||{name:"",cost:"",price:"",qty:"",category:"",brand:"",model:"",minStock:0,supplierId:"",notes:""};
  var cats=t("productCats").split(/[,،]/).map(function(s){return s.trim();}).filter(Boolean);
  if(p.category && cats.indexOf(p.category)<0) cats.unshift(p.category);
  var body='<div class="grid2"><div>'+fld(t("name")+" *",inp("pf_name",p.name))+'</div>'
    +'<div>'+fld(t("category"),'<select id="pf_cat">'+selOpts(cats.map(function(c){return {v:c,l:c};}),p.category,true)+'</select>')+'</div></div>'
    +'<div class="grid3"><div>'+fld(t("brand"),inp("pf_brand",p.brand))+'</div><div>'+fld(t("model"),inp("pf_model",p.model))+'</div>'
    +'<div>'+fld(t("supplier"),'<select id="pf_sup">'+selOpts(DB.suppliers.map(function(s){return {v:s.id,l:s.name};}),p.supplierId,true)+'</select>')+'</div></div>'
    +'<div class="grid3"><div>'+fld(t("purchaseCost")+" *",inp("pf_cost",p.cost,"number",'step="0.01" min="0"'))+'</div>'
    +'<div>'+fld(t("sellingPrice")+" *",inp("pf_price",p.price,"number",'step="0.01" min="0"'))+'</div>'
    +(isNew?'<div>'+fld(t("openingStock"),inp("pf_qty",p.qty,"number",'step="0.01"'))+'</div>':'<div>'+fld(t("stock"),inp("pf_qty_ro",p.qty,"text","disabled"))+'</div>')
    +'</div><div class="grid2"><div>'+fld(t("minStock"),inp("pf_min",p.minStock,"number",'step="1" min="0"'))+'</div></div>'
    +fld(t("notes"),'<textarea id="pf_notes">'+esc(p.notes||"")+'</textarea>');
  openModal(isNew?t("addProduct"):t("editProduct"), body, '<button type="button" class="btn" id="pfSave">'+esc(t("save"))+'</button>', true);
  document.getElementById("pfSave").addEventListener("click",function(){
    var name=document.getElementById("pf_name").value.trim();
    var cost=num(document.getElementById("pf_cost").value), price=num(document.getElementById("pf_price").value);
    if(!name) return formError(t("required")+" ("+t("name")+")");
    if(cost<0||price<0) return formError(t("invalidAmount"));
    var data={ name:name, category:document.getElementById("pf_cat").value, brand:document.getElementById("pf_brand").value.trim(),
      model:document.getElementById("pf_model").value.trim(), supplierId:document.getElementById("pf_sup").value,
      cost:cost, price:price, minStock:num(document.getElementById("pf_min").value), notes:document.getElementById("pf_notes").value.trim() };
    if(isNew){
      data.id=uid("p"); data.qty=num(document.getElementById("pf_qty").value); data.priceHistory=[];
      DB.products.push(data);
      if(data.qty) DB.movements.unshift({id:uid("m"),date:todayStr(),productId:data.id,productName:data.name,change:data.qty,after:data.qty,type:"opening",ref:"",by:me().name});
      logAct("create","Product: "+name);
    } else {
      var old=productById(p.id);
      if(num(old.price)!==price){ old.priceHistory=old.priceHistory||[]; old.priceHistory.push({from:num(old.price),to:price,date:todayStr(),by:me().name}); logAct("price change","Product: "+old.name+" "+money(old.price)+" → "+money(price)); }
      Object.assign(old,data); logAct("edit","Product: "+name);
    }
    save(); closeModal(); toast(t("savedOk")); render();
  });
}

/* ---------------- Inventory ---------------- */
function vInventory(){
  var low=lowStockList();
  var h='<h1>'+esc(t("inventory"))+'</h1><div class="sub">'+esc(t("dataSavedNote"))+'</div>';
  h+='<div class="cards">'+kpi(t("invValue"),money(inventoryValue()))+kpi(t("lowStock"),fmtN(low.length))+kpi(t("products"),fmtN(DB.products.length))+'</div>';
  if(low.length) h+='<div class="alertbox"><strong>'+esc(t("lowStock"))+':</strong> '+low.map(function(p){return esc(p.name)+" ("+fmtN(p.qty)+")";}).join(" · ")+'</div>';
  h+='<div class="toolbar"><div class="fld grow"><label>'+esc(t("search"))+'</label><input id="invSearch" value="'+esc(ui.invSearch)+'" placeholder="'+esc(t("searchPh"))+'"></div>'
    +'<div class="fld"><label>'+esc(t("filter"))+'</label><select id="invLowSel"><option value="">'+esc(t("all"))+'</option><option value="1"'+(ui.invLowOnly?" selected":"")+'>'+esc(t("lowOnly"))+'</option></select></div>'
    +'<button class="btn secondary" data-act="csv" data-mod="stock">'+esc(t("exportCsv"))+'</button></div>';
  var iq=ui.invSearch.toLowerCase();
  var plist=DB.products.filter(function(p){
    if(ui.invLowOnly && !(num(p.qty)<=num(p.minStock))) return false;
    if(iq && (p.name+" "+(p.category||"")+" "+(p.brand||"")+" "+(p.model||"")).toLowerCase().indexOf(iq)<0) return false;
    return true;
  });
  h+='<h2>'+esc(t("stockQtyTitle"))+'</h2>';
  if(!plist.length) h+='<div class="empty">'+esc(t("noData"))+'</div>';
  else{
    h+='<div class="tablewrap"><table><tr><th>'+esc(t("product"))+'</th><th>'+esc(t("category"))+'</th><th class="num">'+esc(t("quantity"))+'</th><th class="num">'+esc(t("minStock"))+'</th><th class="num">'+esc(t("purchaseCost"))+'</th><th class="num">'+esc(t("stockValue"))+'</th><th>'+esc(t("status"))+'</th><th>'+esc(t("actions"))+'</th></tr>';
    plist.forEach(function(p){
      var isLow=num(p.qty)<=num(p.minStock);
      h+='<tr><td class="wrapcell"><strong>'+esc(p.name)+'</strong>'+(p.demo?' <span class="pill warn">'+esc(t("demoTag"))+'</span>':'')+'</td>'
        +'<td>'+esc(p.category||"—")+'</td><td class="num"><strong>'+fmtN(p.qty)+'</strong></td><td class="num">'+fmtN(p.minStock)+'</td>'
        +'<td class="num">'+money(p.cost)+'</td><td class="num">'+money(num(p.qty)*num(p.cost))+'</td>'
        +'<td>'+(isLow?'<span class="pill bad">'+esc(t("lowStock"))+'</span>':'<span class="pill ok">'+esc(t("statusActive"))+'</span>')+'</td>'
        +'<td><button class="btn secondary small" data-act="product-adjust" data-id="'+p.id+'">'+esc(t("adjustStock"))+'</button></td></tr>';
    });
    h+='</table></div>';
  }
  h+='<h2>'+esc(t("movements"))+'</h2>';
  if(!DB.movements.length) return h+'<div class="empty">'+esc(t("noData"))+'</div>';
  var typeLbl={opening:"opening",purchase:"purchase",sale:"sale",sale_cancel:"saleCancel",purchase_cancel:"purchaseCancel",adjustment:"adjustment"};
  h+='<div class="tablewrap"><table><tr><th>'+esc(t("date"))+'</th><th>'+esc(t("product"))+'</th><th>'+esc(t("type"))+'</th><th class="num">'+esc(t("change"))+'</th><th class="num">'+esc(t("stockAfter"))+'</th><th>'+esc(t("reference"))+'</th><th>'+esc(t("who"))+'</th></tr>';
  DB.movements.filter(function(m){ return !iq || String(m.productName||"").toLowerCase().indexOf(iq)>=0; }).slice(0,200).forEach(function(m){
    h+='<tr><td>'+esc(m.date)+'</td><td class="wrapcell">'+esc(m.productName)+'</td><td>'+esc(t(typeLbl[m.type]||"adjustment"))+'</td>'
      +'<td class="num">'+(num(m.change)>0?"+":"")+fmtN(m.change)+'</td><td class="num">'+fmtN(m.after)+'</td><td>'+esc(m.ref||"")+'</td><td>'+esc(m.by||"")+'</td></tr>';
  });
  return h+'</table></div>';
}

/* ---------------- Sales & purchase invoices ---------------- */
function statusPill(inv){
  var s=invStatus(inv);
  var map={paid:["ok","statusPaid"],partial:["warn","statusPartial"],unpaid:["bad","statusUnpaid"],cancelled:["grey","statusCancelled"]};
  return '<span class="pill '+map[s][0]+'">'+esc(t(map[s][1]))+'</span>';
}
function invoiceTable(list, kind){
  if(!list.length) return '<div class="empty">'+esc(t("noData"))+'</div>';
  var h='<div class="tablewrap"><table><tr><th>'+esc(t("number"))+'</th><th>'+esc(t("date"))+'</th><th>'+esc(kind==="sales"?t("customer"):t("supplier"))+'</th><th>'+esc(t("employee"))+'</th><th class="num">'+esc(t("total"))+'</th><th class="num">'+esc(t("paid"))+'</th><th class="num">'+esc(t("remaining"))+'</th><th>'+esc(t("status"))+'</th><th>'+esc(t("actions"))+'</th></tr>';
  list.forEach(function(inv){
    var paid=invoicePaid(inv), party=kind==="sales"?customerById(inv.customerId):supplierById(inv.supplierId);
    h+='<tr><td><strong>'+esc(inv.number)+'</strong>'+(inv.demo?' <span class="pill warn">'+esc(t("demoTag"))+'</span>':'')+'</td><td>'+esc(inv.date)+'</td>'
      +'<td class="wrapcell">'+esc(party?party.name:(inv.partyName||"—"))+'</td><td>'+esc(userName(inv.employeeId))+'</td>'
      +'<td class="num">'+money(inv.total)+'</td><td class="num">'+money(paid)+'</td><td class="num">'+money(num(inv.total)-paid)+'</td>'
      +'<td>'+statusPill(inv)+'</td><td><div class="rowflex" style="gap:6px;flex-wrap:nowrap">'
      +'<button class="btn secondary small" data-act="inv-print" data-kind="'+kind+'" data-id="'+inv.id+'">'+esc(t("print"))+'</button>'
      +(inv.status!=="cancelled"?'<button class="btn secondary small" data-act="inv-pay" data-kind="'+kind+'" data-id="'+inv.id+'">'+esc(t("addPayment"))+'</button>'
      +'<button class="btn danger small" data-act="inv-cancel" data-kind="'+kind+'" data-id="'+inv.id+'">'+esc(t("cancelInvoice"))+'</button>':"")
      +'</div></td></tr>';
    h+='<tr><td colspan="9" style="background:var(--soft);white-space:normal"><small>'+inv.items.map(function(it){return esc(it.name)+" × "+fmtN(it.qty)+" @ "+money(it.price);}).join(" · ")+(num(inv.discount)?' · '+esc(t("discount"))+': '+money(inv.discount):"")+'</small></td></tr>';
  });
  return h+'</table></div>';
}
function vSales(){
  var q=normS(ui.salesSearch);
  var list=DB.salesInvoices.filter(function(inv){
    if(!q) return true;
    var c=customerById(inv.customerId);
    var hay=normS(inv.number+" "+(inv.partyName||"")+" "+(c?c.name:"")+" "+(c?c.phone||"":"")+" "+(c?c.whatsapp||"":""));
    return hay.indexOf(q)>=0;
  });
  var resTotal=list.filter(function(inv){return inv.status!=="cancelled";}).reduce(function(s,inv){return s+num(inv.total);},0);
  var h='<h1>'+esc(t("sales"))+'</h1>'
    +'<div class="toolbar"><div class="fld grow"><label>'+esc(t("searchInvoiceTitle"))+'</label><input id="salesSearch" value="'+esc(ui.salesSearch)+'" placeholder="'+esc(t("searchInvoicePh"))+'"></div>'
    +'<button class="btn" data-act="sales-new">'+esc(t("newInvoice"))+'</button>'
    +'<button class="btn secondary" data-act="csv" data-mod="sales">'+esc(t("exportCsv"))+'</button></div>';
  if(q) h+='<div class="sub">'+fmtN(list.length)+' '+esc(t("results"))+' · '+esc(t("totalOfResults"))+': <strong>'+money(resTotal)+'</strong></div>';
  return h+invoiceTable(list,"sales");
}
function vPurchases(){
  var h='<h1>'+esc(t("purchases"))+'</h1><div class="rowflex" style="margin:12px 0"><button class="btn" data-act="purchase-new">'+esc(t("newPurchase"))+'</button>'
    +'<button class="btn secondary" data-act="csv" data-mod="purchases">'+esc(t("exportCsv"))+'</button></div>';
  return h+invoiceTable(DB.purchaseInvoices,"purchase");
}
function itemsEditorHtml(kind, presetItems, presetDiscount){
  var rows=(presetItems&&presetItems.length?presetItems:[{productId:"",qty:1,price:""}]).map(function(it){ return itemRowHtml(kind,it); }).join("");
  return '<div id="itemsWrap">'+rows+'</div><button type="button" class="btn secondary small" id="addRowBtn" style="margin-top:8px">'+esc(t("addItem"))+'</button>'
    +'<div class="grid3"><div>'+fld(t("discount"),inp("inv_discount",presetDiscount||0,"number",'step="0.01" min="0"'))+'</div>'
    +'<div>'+fld(t("payNow"),inp("inv_paid",0,"number",'step="0.01" min="0"'))+'</div>'
    +'<div>'+fld(t("payMethod"),'<select id="inv_method"><option value="cash">'+esc(t("cash"))+'</option><option value="bank">'+esc(t("bank"))+'</option></select>')+'</div></div>'
    +'<h3>'+esc(t("grandTotal"))+': <span id="invTotal">0</span></h3>';
}
function itemRowHtml(kind, it){
  var opts=DB.products.map(function(p){ return {v:p.id,l:p.name+" ("+esc(t("stock"))+": "+fmtN(p.qty)+")"}; });
  return '<div class="itemrow" style="display:grid;grid-template-columns:2fr 1fr 1fr auto;gap:0 10px;align-items:end;border-bottom:1px solid var(--line);padding-bottom:6px;margin-bottom:4px">'
    +'<div>'+fld(t("product"),'<select class="it-prod">'+selOpts(opts,it.productId,true)+'</select>')+'</div>'
    +'<div>'+fld(t("quantity"),'<input class="it-qty" type="number" step="0.01" min="0" value="'+esc(it.qty==null?1:it.qty)+'">')+'</div>'
    +'<div>'+fld(kind==="sales"?t("sellingPrice"):t("purchaseCost"),'<input class="it-price" type="number" step="0.01" min="0" value="'+esc(it.price==null?"":it.price)+'">')+'</div>'
    +'<div><button type="button" class="btn danger small it-remove" title="'+esc(t("removeItem"))+'" aria-label="'+esc(t("removeItem"))+'">✕ '+esc(t("removeItem"))+'</button></div></div>';
}
function wireItems(kind){
  var wrap=document.getElementById("itemsWrap");
  function recalc(){
    var sub=0;
    wrap.querySelectorAll(".itemrow").forEach(function(r){ sub+=num(r.querySelector(".it-qty").value)*num(r.querySelector(".it-price").value); });
    var total=Math.max(0, sub-num(document.getElementById("inv_discount").value));
    document.getElementById("invTotal").textContent=money(total);
  }
  wrap.addEventListener("change",function(e){
    if(e.target.classList.contains("it-prod")){
      var p=productById(e.target.value); var row=e.target.closest(".itemrow");
      if(p) row.querySelector(".it-price").value = kind==="sales"?p.price:p.cost;
    }
    recalc();
  });
  wrap.addEventListener("input",recalc);
  wrap.addEventListener("click",function(e){
    var rm=e.target.closest(".it-remove"); if(!rm) return;
    var row=rm.closest(".itemrow"); if(!row) return;
    if(wrap.querySelectorAll(".itemrow").length>1){ row.remove(); }
    else { row.querySelector(".it-prod").value=""; row.querySelector(".it-qty").value=1; row.querySelector(".it-price").value=""; }
    recalc();
  });
  document.getElementById("inv_discount").addEventListener("input",recalc);
  document.getElementById("addRowBtn").addEventListener("click",function(){
    var d=document.createElement("div"); d.innerHTML=itemRowHtml(kind,{}); wrap.appendChild(d.firstChild); recalc();
  });
  recalc();
  return recalc;
}
function readItems(kind){
  var items=[], err=null;
  document.querySelectorAll("#itemsWrap .itemrow").forEach(function(r){
    var pid=r.querySelector(".it-prod").value, qty=num(r.querySelector(".it-qty").value), price=num(r.querySelector(".it-price").value);
    if(!pid && qty===0) return;
    if(!pid){ err=t("chooseProduct"); return; }
    if(qty<=0) return;
    var p=productById(pid); if(!p){ err=t("chooseProduct"); return; }
    items.push({productId:pid, name:p.name, qty:qty, price:price, cost:num(p.cost)});
  });
  if(err) return {error:err};
  if(!items.length) return {error:t("itemsRequired")};
  return {items:items};
}
function invoiceForm(kind, preset){
  var isSales=kind==="sales";
  var parties=isSales?DB.customers:DB.suppliers;
  var partyFieldHtml;
  if(isSales){
    partyFieldHtml='<div id="invPartyExisting">'
      +fld(t("customer")+" *",'<select id="inv_party">'+selOpts(parties.map(function(c){return {v:c.id,l:c.name};}),preset&&preset.partyId,true)+'</select>')
      +'<div class="rowflex" style="margin-top:8px;align-items:center"><button type="button" class="btn secondary small" id="invNewCustBtn">'+esc(t("addNewCustomerBtn"))+'</button><span style="color:var(--muted);font-size:13px">'+esc(t("chooseCustomerOrNew"))+'</span></div>'
      +'</div>'
      +'<div id="invPartyNew" style="display:none;border:1px solid var(--line);border-radius:10px;background:var(--soft);padding:12px 14px;margin-top:4px">'
      +'<div class="rowflex" style="justify-content:space-between;align-items:center"><strong style="color:var(--navy)">'+esc(t("newCustInlineTitle"))+'</strong><button type="button" class="btn secondary small" id="invExistingCustBtn">'+esc(t("useExistingCustomer"))+'</button></div>'
      +'<p style="color:var(--muted);font-size:13.5px;margin:6px 0 2px">'+esc(t("newCustInlineNote"))+'</p>'
      +fld(t("name")+" *",inp("nc_name",""))
      +'<div class="grid2"><div>'+fld(t("phone"),inp("nc_phone",""))+'</div><div>'+fld(t("whatsapp"),inp("nc_whatsapp",""))+'</div></div>'
      +fld(t("address"),inp("nc_address",""))
      +fld(t("notes"),'<textarea id="nc_notes"></textarea>')
      +'</div>';
  } else {
    partyFieldHtml=fld(t("supplier")+" *",'<select id="inv_party">'+selOpts(parties.map(function(c){return {v:c.id,l:c.name};}),preset&&preset.partyId,true)+'</select>');
  }
  var body=partyFieldHtml
    +'<div class="grid2"><div>'+fld(t("date"),inp("inv_date",(preset&&preset.date)||todayStr(),"date"))+'</div>'
    +'<div>'+fld(t("employee"),'<select id="inv_emp">'+selOpts(DB.users.map(function(u){return {v:u.id,l:u.name};}),DB.settings.userId)+'</select>')+'</div></div>'
    +'<h3>'+esc(t("items"))+'</h3>'+itemsEditorHtml(kind, preset&&preset.items, preset&&preset.discount);
  openModal(isSales?t("newInvoice"):t("newPurchase"), body, '<button type="button" class="btn" id="invSave">'+esc(t("save"))+'</button>', true);
  wireItems(kind);
  if(preset&&preset.partyId){ var psel=document.getElementById("inv_party"); if(psel) psel.value=preset.partyId; }
  var newCustMode=false;
  var createdCustForToast=null;
  var reusedCustForToast=null;
  if(isSales){
    var exWrap=document.getElementById("invPartyExisting");
    var newWrap=document.getElementById("invPartyNew");
    var newBtn=document.getElementById("invNewCustBtn");
    var exBtn=document.getElementById("invExistingCustBtn");
    if(newBtn) newBtn.addEventListener("click",function(){ newCustMode=true; if(exWrap) exWrap.style.display="none"; if(newWrap) newWrap.style.display=""; var n=document.getElementById("nc_name"); if(n) n.focus(); });
    if(exBtn) exBtn.addEventListener("click",function(){ newCustMode=false; if(newWrap) newWrap.style.display="none"; if(exWrap) exWrap.style.display=""; });
  }
  document.getElementById("invSave").addEventListener("click",function(){
    var pendingNewCust=null;
    var partyId="";
    if(isSales && newCustMode){
      var ncName=(document.getElementById("nc_name")||{value:""}).value.trim();
      if(!ncName) return formError(t("required")+" ("+t("name")+")");
      pendingNewCust={ name:ncName, phone:(document.getElementById("nc_phone")||{value:""}).value.trim(), whatsapp:(document.getElementById("nc_whatsapp")||{value:""}).value.trim(), address:(document.getElementById("nc_address")||{value:""}).value.trim(), notes:(document.getElementById("nc_notes")||{value:""}).value.trim() };
    } else {
      var partySelEl=document.getElementById("inv_party");
      partyId=partySelEl?partySelEl.value:"";
      if(!partyId) return formError(isSales?t("chooseCustomer"):t("chooseSupplier"));
    }
    var rd=readItems(kind); if(rd.error) return formError(rd.error);
    var items=rd.items;
    if(isSales && !DB.settings.allowNegative){
      for(var i=0;i<items.length;i++){ var p=productById(items[i].productId);
        if(p && items[i].qty>num(p.qty)) return formError(t("notEnoughStock")+" "+p.name+" ("+fmtN(p.qty)+"). "+t("allowNegOff"));
      }
      // aggregate duplicate product rows
      var agg={}; items.forEach(function(it){ agg[it.productId]=(agg[it.productId]||0)+it.qty; });
      for(var pid in agg){ var pp=productById(pid); if(pp&&agg[pid]>num(pp.qty)) return formError(t("notEnoughStock")+" "+pp.name+" ("+fmtN(pp.qty)+"). "+t("allowNegOff")); }
    }
    var sub=items.reduce(function(s,it){return s+it.qty*it.price;},0);
    var discount=Math.min(num(document.getElementById("inv_discount").value),sub);
    var total=sub-discount;
    var paidNow=Math.min(num(document.getElementById("inv_paid").value),total);
    var method=document.getElementById("inv_method").value;
    var date=document.getElementById("inv_date").value||todayStr();
    var emp=document.getElementById("inv_emp").value;
    /* Create the inline customer ONLY after items & stock validated, so a
       failed invoice never leaves an orphan customer. The record goes into
       DB.customers — the exact same main list used by the Customers section,
       customerBalance() and statementHtml() — so it appears there instantly
       with its balance/statement and this invoice linked by customerId. */
    if(pendingNewCust){
      var dupCust=null;
      var ncPhoneN=pendingNewCust.phone, ncWaN=pendingNewCust.whatsapp;
      if(ncPhoneN) dupCust=DB.customers.find(function(c){ return String(c.phone||"").trim()===ncPhoneN || String(c.whatsapp||"").trim()===ncPhoneN; })||null;
      if(!dupCust && ncWaN) dupCust=DB.customers.find(function(c){ return String(c.whatsapp||"").trim()===ncWaN || String(c.phone||"").trim()===ncWaN; })||null;
      if(!dupCust) dupCust=DB.customers.find(function(c){ return String(c.name||"").trim().toLowerCase()===pendingNewCust.name.toLowerCase() && String(c.phone||"").trim()===ncPhoneN && ncPhoneN; })||null;
      if(dupCust){ partyId=dupCust.id; reusedCustForToast=dupCust; }
      else {
        var newCustRec={id:uid("c"), name:pendingNewCust.name, phone:pendingNewCust.phone, whatsapp:pendingNewCust.whatsapp, email:"", address:pendingNewCust.address, openingBalance:0, notes:pendingNewCust.notes};
        DB.customers.push(newCustRec);
        logAct("create","Customer: "+newCustRec.name+" (from sales invoice / new order)");
        partyId=newCustRec.id; createdCustForToast=newCustRec;
      }
    }
    var party=isSales?customerById(partyId):supplierById(partyId);
    if(isSales){
      var inv={ id:uid("si"), number:"INV-"+(DB.counters.sales++), date:date, customerId:partyId, partyName:party?party.name:"", employeeId:emp,
        items:items, discount:discount, total:total, status:"active" };
      DB.salesInvoices.unshift(inv);
      items.forEach(function(it){ moveStock(it.productId,-it.qty,"sale",inv.number); });
      if(paidNow>0) DB.payments.unshift({id:uid("pay"),date:date,dir:"in",partyId:partyId,partyName:party?party.name:"",amount:paidNow,method:method,invoiceId:inv.id,invoiceNumber:inv.number,note:"",createdById:me().id,createdByName:me().name});
      var commAmt=total*num(DB.settings.commissionPct)/100;
      if(commAmt>0) DB.commissions.unshift({id:uid("cm"),date:date,invoiceId:inv.id,invoiceNumber:inv.number,employeeId:emp,amount:commAmt,rate:num(DB.settings.commissionPct),paid:false});
      logAct("create","Sales invoice "+inv.number+" — "+money(total));
    } else {
      var pinv={ id:uid("pi"), number:"PUR-"+(DB.counters.purchase++), date:date, supplierId:partyId, partyName:party?party.name:"", employeeId:emp,
        items:items, discount:discount, total:total, status:"active" };
      DB.purchaseInvoices.unshift(pinv);
      items.forEach(function(it){ var p=productById(it.productId); if(p){ p.cost=it.price; } moveStock(it.productId,it.qty,"purchase",pinv.number); });
      if(paidNow>0) DB.payments.unshift({id:uid("pay"),date:date,dir:"out",partyId:partyId,partyName:party?party.name:"",amount:paidNow,method:method,invoiceId:pinv.id,invoiceNumber:pinv.number,note:"",createdById:me().id,createdByName:me().name});
      logAct("create","Purchase invoice "+pinv.number+" — "+money(total));
    }
    save(); closeModal();
    if(createdCustForToast) toast(t("customerSavedInline")+createdCustForToast.name+" — "+t("savedOk"));
    else if(reusedCustForToast) toast(t("duplicateCustomerFound")+reusedCustForToast.name);
    else toast(t("savedOk"));
    render();
  });
}
function cancelInvoice(kind, id){
  var list=kind==="sales"?DB.salesInvoices:DB.purchaseInvoices;
  var inv=list.find(function(x){return x.id===id;}); if(!inv||inv.status==="cancelled") return;
  confirmModal(t("confirmCancelInv"), t("cancelInvoice"), function(){
    inv.status="cancelled";
    inv.items.forEach(function(it){ moveStock(it.productId, kind==="sales"?it.qty:-it.qty, kind==="sales"?"sale_cancel":"purchase_cancel", inv.number); });
    DB.payments.forEach(function(p){ if(p.invoiceId===inv.id) p.voided=true; });
    if(kind==="sales") DB.commissions=DB.commissions.filter(function(c){return c.invoiceId!==inv.id;});
    logAct("cancel",(kind==="sales"?"Sales":"Purchase")+" invoice "+inv.number+" cancelled");
    save(); toast(t("cancelledOk")); render();
  });
}
function printInvoice(kind, id){
  var inv=(kind==="sales"?DB.salesInvoices:DB.purchaseInvoices).find(function(x){return x.id===id;}); if(!inv) return;
  var party=kind==="sales"?customerById(inv.customerId):supplierById(inv.supplierId);
  var rows=inv.items.map(function(it,i){ return '<tr><td>'+(i+1)+'</td><td>'+esc(it.name)+'</td><td style="text-align:end">'+fmtN(it.qty)+'</td><td style="text-align:end">'+money(it.price)+'</td><td style="text-align:end">'+money(it.qty*it.price)+'</td></tr>'; }).join("");
  var paid=invoicePaid(inv);
  var doc='<div class="docbox"><div class="dhead"><div><div class="dbrand">Epsilon</div><div>'+esc(kind==="sales"?t("invoice"):t("purchase"))+'</div></div>'
    +'<div style="text-align:end"><div><strong>'+esc(inv.number)+'</strong></div><div>'+esc(t("date"))+': '+esc(inv.date)+'</div><div>'+esc(t("status"))+': '+esc(t(invStatus(inv)==="paid"?"statusPaid":invStatus(inv)==="partial"?"statusPartial":invStatus(inv)==="cancelled"?"statusCancelled":"statusUnpaid"))+'</div></div></div>'
    +'<p><strong>'+esc(kind==="sales"?t("customer"):t("supplier"))+':</strong> '+esc(party?party.name:(inv.partyName||""))+(party&&party.phone?'<br>'+esc(t("phone"))+': '+esc(party.phone):"")+(party&&party.whatsapp?'<br>'+esc(t("whatsapp"))+': '+esc(party.whatsapp):"")+(party&&party.address?'<br>'+esc(party.address):"")+'</p>'
    +'<table><tr><th>#</th><th>'+esc(t("product"))+'</th><th style="text-align:end">'+esc(t("quantity"))+'</th><th style="text-align:end">'+esc(t("price"))+'</th><th style="text-align:end">'+esc(t("lineTotal"))+'</th></tr>'+rows+'</table>'
    +'<table style="margin-top:12px;max-width:320px;margin-inline-start:auto"><tr><td>'+esc(t("subtotal"))+'</td><td style="text-align:end">'+money(num(inv.total)+num(inv.discount))+'</td></tr>'
    +'<tr><td>'+esc(t("discount"))+'</td><td style="text-align:end">'+money(inv.discount)+'</td></tr>'
    +'<tr><td><strong>'+esc(t("grandTotal"))+'</strong></td><td style="text-align:end"><strong>'+money(inv.total)+'</strong></td></tr>'
    +'<tr><td>'+esc(t("paid"))+'</td><td style="text-align:end">'+money(paid)+'</td></tr>'
    +'<tr><td>'+esc(t("remaining"))+'</td><td style="text-align:end">'+money(num(inv.total)-paid)+'</td></tr></table>'
    +'<p style="margin-top:16px;color:#555">'+esc(t("terms"))+'</p>'
    +'<div class="sig"><span>'+esc(t("preparedBy"))+': '+esc(userName(inv.employeeId))+'</span><span>'+esc(t("signature"))+': ____________</span></div></div>'
    +'<div class="rowflex" style="margin-top:14px" data-noprint="1"><button class="btn secondary" id="backBtn">'+esc(t("backToApp"))+'</button></div>';
  var app=document.getElementById("app");
  app.innerHTML=doc;
  document.getElementById("printDoc").innerHTML=doc.replace(/ data-noprint="1"/g,' style="display:none"');
  document.getElementById("backBtn").addEventListener("click",function(){ document.getElementById("printDoc").innerHTML=""; render(); });
  window.scrollTo(0,0);
}

/* ---------------- Customers & suppliers ---------------- */
function partyForm(kind, rec){
  var isNew=!rec; rec=rec||{name:"",phone:"",whatsapp:"",email:"",address:"",openingBalance:0,notes:""};
  var body=fld(t("name")+" *",inp("pt_name",rec.name))
    +'<div class="grid2"><div>'+fld(t("phone"),inp("pt_phone",rec.phone))+'</div><div>'+fld(t("email"),inp("pt_email",rec.email))+'</div></div>'
    +(kind==="customer"?fld(t("whatsapp"),inp("pt_whatsapp",rec.whatsapp||"")):"")
    +fld(t("address"),inp("pt_addr",rec.address))
    +(isNew?fld(t("openingBalance"),inp("pt_open",rec.openingBalance,"number",'step="0.01"'))+'<div class="sub">'+esc(t("openingBalNote"))+'</div>':"")
    +fld(t("notes"),'<textarea id="pt_notes">'+esc(rec.notes||"")+'</textarea>');
  openModal(isNew?(kind==="customer"?t("newCustomer"):t("newSupplier")):(kind==="customer"?t("editCustomer"):t("editSupplier")), body,
    '<button type="button" class="btn" id="ptSave">'+esc(t("save"))+'</button>');
  document.getElementById("ptSave").addEventListener("click",function(){
    var name=document.getElementById("pt_name").value.trim();
    if(!name) return formError(t("required")+" ("+t("name")+")");
    var waEl=document.getElementById("pt_whatsapp");
    var data={name:name,phone:document.getElementById("pt_phone").value.trim(),whatsapp:waEl?waEl.value.trim():(rec.whatsapp||""),email:document.getElementById("pt_email").value.trim(),
      address:document.getElementById("pt_addr").value.trim(),notes:document.getElementById("pt_notes").value.trim()};
    if(isNew){ data.id=uid(kind==="customer"?"c":"s"); data.openingBalance=num(document.getElementById("pt_open").value);
      (kind==="customer"?DB.customers:DB.suppliers).push(data); logAct("create",(kind==="customer"?"Customer: ":"Supplier: ")+name);
    } else { Object.assign(rec,data); logAct("edit",(kind==="customer"?"Customer: ":"Supplier: ")+name); }
    save(); closeModal(); toast(t("savedOk")); render();
  });
}
function statementHtml(kind, id){
  var rec=kind==="customer"?customerById(id):supplierById(id); if(!rec) return "";
  var isCust=kind==="customer";
  var tot=partyTotals(kind,id);
  var bal=isCust?customerBalance(id):supplierBalance(id);
  var h='<h3>'+esc(isCust?t("customerStatement"):t("supplierStatement"))+' — '+esc(rec.name)+'</h3>';
  h+='<div class="sub">'+esc(isCust?t("stmtExplainCust"):t("stmtExplainSupp"))+'</div>';
  /* --- Summary: عليه كام / دفع كام / لسه كام --- */
  h+='<div class="cards">'
    +kpi(isCust?t("totalBilled"):t("totalBought"), money(tot.invoiced))
    +kpi(isCust?t("totalHePaid"):t("totalWePaid"), money(tot.paid))
    +kpi(isCust?t("stillOwesLbl"):t("stillWeOweLbl"), money(Math.abs(bal)))
    +kpi(t("paymentsCount"), fmtN(tot.payCount)+(tot.lastPay?' · '+esc(t("lastPayment"))+': '+esc(tot.lastPay):""))
    +'</div>';
  h+='<div style="margin:2px 0 6px">'+esc(t("balance"))+': '+balanceHtml(kind,bal)+'</div>';
  /* --- Invoices & payment status (linked: pay part or all per invoice) --- */
  h+='<h3>'+esc(t("invoicesPayStatus"))+'</h3>';
  if(!tot.invList.length) h+='<div class="empty">'+esc(t("noData"))+'</div>';
  else{
    h+='<div class="tablewrap"><table><tr><th>'+esc(t("number"))+'</th><th>'+esc(t("date"))+'</th><th class="num">'+esc(t("total"))+'</th><th class="num">'+esc(t("paid"))+'</th><th class="num">'+esc(t("remaining"))+'</th><th>'+esc(t("status"))+'</th><th>'+esc(t("actions"))+'</th></tr>';
    tot.invList.slice().sort(function(a,b){return a.date<b.date?-1:1;}).forEach(function(inv){
      var pd=invoicePaid(inv), rem=num(inv.total)-pd;
      var st=rem<=-0.001?'<span class="pill ok">'+esc(t("overpaidStatus"))+'</span>':statusPill(inv);
      h+='<tr><td><strong>'+esc(inv.number)+'</strong></td><td>'+esc(inv.date)+'</td><td class="num">'+money(inv.total)+'</td><td class="num">'+money(pd)+'</td><td class="num">'+money(Math.max(0,rem))+'</td><td>'+st+'</td>'
        +'<td><button class="btn secondary small" data-act="inv-pay" data-kind="'+(isCust?"sales":"purchase")+'" data-id="'+inv.id+'">'+esc(t("payThisInvoice"))+'</button></td></tr>';
    });
    h+='</table></div>';
  }
  /* --- Payments: when & who recorded them --- */
  h+='<h3>'+esc(t("paymentHistory"))+'</h3>';
  var paysSorted=tot.pays.slice().sort(function(a,b){return a.date<b.date?1:(a.date>b.date?-1:0);});
  if(!paysSorted.length) h+='<div class="empty">'+esc(t("noData"))+'</div>';
  else{
    h+='<div class="tablewrap"><table><tr><th>'+esc(t("date"))+'</th><th class="num">'+esc(t("amount"))+'</th><th>'+esc(t("method"))+'</th><th>'+esc(t("invoiceFor"))+'</th><th>'+esc(t("recordedBy"))+'</th><th>'+esc(t("notes"))+'</th></tr>';
    paysSorted.forEach(function(p){
      h+='<tr><td>'+esc(p.date)+'</td><td class="num"><strong>'+money(p.amount)+'</strong></td><td>'+esc(p.method==="bank"?t("bank"):t("cash"))+'</td><td>'+esc(p.invoiceNumber||"—")+'</td><td>'+esc(payRecorder(p))+'</td><td>'+esc(p.note||"")+'</td></tr>';
    });
    h+='</table></div>';
  }
  /* --- Running ledger --- */
  var rows=[]; var rbal=num(rec.openingBalance);
  rows.push({date:"—",label:t("txOpening"),debit:rbal>0?rbal:0,credit:rbal<0?-rbal:0,bal:rbal,by:""});
  var txs=[];
  if(isCust){
    DB.salesInvoices.forEach(function(inv){ if(inv.customerId===id) txs.push({date:inv.date,label:t("txSale")+" "+inv.number+(inv.status==="cancelled"?" "+t("txCancelled"):""),debit:inv.status==="cancelled"?0:num(inv.total),sort:inv.date,by:userName(inv.employeeId)}); });
    DB.payments.forEach(function(p){ if(!p.voided&&p.dir==="in"&&p.partyId===id) txs.push({date:p.date,label:t("txPaymentIn")+((p.invoiceNumber||p.note)?" — "+(p.invoiceNumber||p.note):""),credit:num(p.amount),sort:p.date,by:payRecorder(p)}); });
  } else {
    DB.purchaseInvoices.forEach(function(inv){ if(inv.supplierId===id) txs.push({date:inv.date,label:t("txPurchase")+" "+inv.number+(inv.status==="cancelled"?" "+t("txCancelled"):""),debit:inv.status==="cancelled"?0:num(inv.total),sort:inv.date,by:userName(inv.employeeId)}); });
    DB.payments.forEach(function(p){ if(!p.voided&&p.dir==="out"&&p.partyId===id) txs.push({date:p.date,label:t("txPaymentOut")+((p.invoiceNumber||p.note)?" — "+(p.invoiceNumber||p.note):""),credit:num(p.amount),sort:p.date,by:payRecorder(p)}); });
  }
  txs.sort(function(a,b){return a.sort<b.sort?-1:1;});
  txs.forEach(function(x){ rbal+=num(x.debit)-num(x.credit); rows.push({date:x.date,label:x.label,debit:num(x.debit),credit:num(x.credit),bal:rbal,by:x.by||""}); });
  h+='<div class="tablewrap" style="margin-top:14px"><table><tr><th>'+esc(t("date"))+'</th><th>'+esc(t("description"))+'</th><th class="num">'+esc(isCust?t("debitCust"):t("debitSupp"))+'</th><th class="num">'+esc(isCust?t("creditCust"):t("creditSupp"))+'</th><th class="num">'+esc(t("running"))+'</th><th>'+esc(t("recordedBy"))+'</th></tr>';
  rows.forEach(function(r){ h+='<tr><td>'+esc(r.date)+'</td><td class="wrapcell">'+esc(r.label)+'</td><td class="num">'+(r.debit?money(r.debit):"—")+'</td><td class="num">'+(r.credit?money(r.credit):"—")+'</td><td class="num"><strong>'+money(r.bal)+'</strong></td><td>'+esc(r.by||"")+'</td></tr>'; });
  return h+'</table></div>';
}
function vCustomers(){ return partyListView("customer"); }
function vSuppliers(){ return partyListView("supplier"); }
function partyListView(kind){
  var isCust=kind==="customer";
  var allList=isCust?DB.customers:DB.suppliers;
  var stmtId=isCust?ui.stmtCustomer:ui.stmtSupplier;
  var q=normS(isCust?ui.custSearch:ui.suppSearch);
  var list=allList.filter(function(r){
    if(!q) return true;
    return normS((r.name||"")+" "+(r.phone||"")+" "+(r.whatsapp||"")+" "+(r.email||"")+" "+(r.address||"")).indexOf(q)>=0;
  });
  var searchId=isCust?"custSearch":"suppSearch";
  var h='<h1>'+esc(t(isCust?"customers":"suppliers"))+'</h1>'
    +'<div class="toolbar"><div class="fld grow"><label>'+esc(t("searchByNamePhone"))+'</label><input id="'+searchId+'" value="'+esc(isCust?ui.custSearch:ui.suppSearch)+'" placeholder="'+esc(t("searchCustPh"))+'"></div>'
    +'<button class="btn" data-act="'+kind+'-new">'+esc(isCust?t("newCustomer"):t("newSupplier"))+'</button>'
    +'<button class="btn secondary" data-act="csv" data-mod="'+kind+'s">'+esc(t("exportCsv"))+'</button></div>';
  if(q) h+='<div class="sub">'+fmtN(list.length)+' '+esc(t("results"))+'</div>';
  if(!list.length) h+='<div class="empty">'+esc(t("noData"))+'</div>';
  else{
    if(isCust){
      h+='<div class="tablewrap"><table><tr><th>'+esc(t("name"))+'</th><th>'+esc(t("phone"))+' / '+esc(t("whatsapp"))+'</th><th>'+esc(t("email"))+'</th><th>'+esc(t("address"))+'</th><th class="num">'+esc(t("balance"))+'</th><th class="num">'+esc(t("totalHePaid"))+'</th><th>'+esc(t("actions"))+'</th></tr>';
    } else {
      h+='<div class="tablewrap"><table><tr><th>'+esc(t("name"))+'</th><th>'+esc(t("phone"))+'</th><th>'+esc(t("email"))+'</th><th>'+esc(t("address"))+'</th><th class="num">'+esc(t("balance"))+'</th><th class="num">'+esc(t("totalWePaid"))+'</th><th>'+esc(t("actions"))+'</th></tr>';
    }
    list.forEach(function(r){
      var bal=isCust?customerBalance(r.id):supplierBalance(r.id);
      var tot=partyTotals(kind,r.id);
      if(isCust){
        h+='<tr><td class="wrapcell"><strong>'+esc(r.name)+'</strong>'+(r.demo?' <span class="pill warn">'+esc(t("demoTag"))+'</span>':'')+(r.notes?'<br><small style="color:var(--muted)">'+esc(r.notes)+'</small>':'')+'</td><td>'+esc(r.phone||"—")+(r.whatsapp?'<br><small style="color:var(--muted)">'+esc(t("whatsapp"))+': '+esc(r.whatsapp)+'</small>':"")+'</td><td>'+esc(r.email||"—")+'</td><td class="wrapcell">'+esc(r.address||"—")+'</td>'
          +'<td class="num">'+balanceHtml(kind,bal)+'</td><td class="num">'+money(tot.paid)+(tot.lastPay?'<br><small style="color:var(--muted)">'+esc(t("lastPayment"))+': '+esc(tot.lastPay)+'</small>':"")+'</td>';
      } else {
        h+='<tr><td class="wrapcell"><strong>'+esc(r.name)+'</strong>'+(r.demo?' <span class="pill warn">'+esc(t("demoTag"))+'</span>':'')+(r.notes?'<br><small style="color:var(--muted)">'+esc(r.notes)+'</small>':'')+'</td><td>'+esc(r.phone||"—")+'</td><td>'+esc(r.email||"—")+'</td><td class="wrapcell">'+esc(r.address||"—")+'</td>'
          +'<td class="num">'+balanceHtml(kind,bal)+'</td><td class="num">'+money(tot.paid)+(tot.lastPay?'<br><small style="color:var(--muted)">'+esc(t("lastPayment"))+': '+esc(tot.lastPay)+'</small>':"")+'</td>';
      }
      h+='<td><div class="rowflex" style="gap:6px;flex-wrap:wrap"><button class="btn secondary small" data-act="'+kind+'-stmt" data-id="'+r.id+'">'+esc(t("statement"))+'</button>'
        +'<button class="btn secondary small" data-act="party-pay" data-kind="'+kind+'" data-id="'+r.id+'">'+esc(t("addPayment"))+'</button>'
        +'<button class="btn secondary small" data-act="'+kind+'-edit" data-id="'+r.id+'">'+esc(t("edit"))+'</button>'
        +'<button class="btn danger small" data-act="'+kind+'-del" data-id="'+r.id+'">'+esc(t("delete"))+'</button></div></td></tr>';
    });
    h+='</table></div>';
  }
  if(stmtId && allList.some(function(r){return r.id===stmtId;})) h+=statementHtml(kind, stmtId);
  return h;
}

/* ---------------- Payments ---------------- */
function vPayments(){
  var pq=normS(ui.paySearch);
  function matchP(p){
    if(ui.payDir && p.dir!==ui.payDir) return false;
    if(ui.payFrom && p.date<ui.payFrom) return false;
    if(ui.payTo && p.date>ui.payTo) return false;
    if(!pq) return true;
    var partyRec=p.dir==="in"?customerById(p.partyId):supplierById(p.partyId);
    var invNum=p.invoiceNumber||p.note||"";
    if(!invNum && p.invoiceId){ var iv=(p.dir==="in"?DB.salesInvoices:DB.purchaseInvoices).find(function(x){return x.id===p.invoiceId;}); if(iv) invNum=iv.number; }
    var hay=normS((p.partyName||"")+" "+(partyRec?partyRec.phone||"":"")+" "+(partyRec?partyRec.whatsapp||"":"")+" "+invNum+" "+(p.note||""));
    return hay.indexOf(pq)>=0;
  }
  var ins=DB.payments.filter(function(p){return p.dir==="in"&&matchP(p);});
  var outs=DB.payments.filter(function(p){return p.dir==="out"&&matchP(p);});
  var totIn=ins.filter(function(p){return !p.voided;}).reduce(function(s,p){return s+num(p.amount);},0);
  var totOut=outs.filter(function(p){return !p.voided;}).reduce(function(s,p){return s+num(p.amount);},0);
  function grouped(list, kind){
    if(!list.length) return '<div class="empty">'+esc(t("noData"))+'</div>';
    var map={}, order=[];
    list.forEach(function(p){
      var k=p.partyId||("name:"+normS(p.partyName||""));
      if(!map[k]){ map[k]={name:p.partyName||"—",rec:kind==="customer"?customerById(p.partyId):supplierById(p.partyId),rows:[],total:0}; order.push(k); }
      map[k].rows.push(p); if(!p.voided) map[k].total+=num(p.amount);
    });
    var groups=order.map(function(k){return map[k];}).sort(function(a,b){return b.total-a.total;});
    var h="";
    groups.forEach(function(g){
      var rows=g.rows.slice().sort(function(a,b){return a.date<b.date?1:(a.date>b.date?-1:0);});
      var last=rows.length?rows[0].date:"";
      h+='<h3 style="margin-top:18px">'+esc(g.name)
        +(g.rec&&g.rec.phone?' <small style="color:var(--muted)">'+esc(g.rec.phone)+'</small>':"")
        +' — '+esc(t("total"))+': <strong>'+money(g.total)+'</strong> · '+esc(t("paymentsCount"))+': '+fmtN(rows.filter(function(p){return !p.voided;}).length)
        +(last?' · '+esc(t("lastPayment"))+': '+esc(last):"")+'</h3>';
      h+='<div class="tablewrap"><table><tr><th>'+esc(t("date"))+'</th><th class="num">'+esc(t("amount"))+'</th><th>'+esc(t("method"))+'</th><th>'+esc(t("invoiceFor"))+'</th><th>'+esc(t("recordedBy"))+'</th><th>'+esc(t("notes"))+'</th><th>'+esc(t("status"))+'</th></tr>';
      rows.forEach(function(p){
        var invNum=p.invoiceNumber||"";
        if(!invNum && p.invoiceId){ var iv=(kind==="customer"?DB.salesInvoices:DB.purchaseInvoices).find(function(x){return x.id===p.invoiceId;}); if(iv) invNum=iv.number; }
        h+='<tr'+(p.voided?' style="opacity:.55"':'')+'><td>'+esc(p.date)+'</td><td class="num"><strong>'+money(p.amount)+'</strong></td><td>'+esc(p.method==="bank"?t("bank"):t("cash"))+'</td><td>'+esc(invNum||"—")+'</td><td>'+esc(payRecorder(p))+'</td><td>'+esc(p.note||"")+'</td><td>'+(p.voided?'<span class="pill grey">'+esc(t("statusCancelled"))+'</span>':'<span class="pill ok">'+esc(t("statusActive"))+'</span>')+'</td></tr>';
      });
      h+='</table></div>';
    });
    return h;
  }
  var h='<h1>'+esc(t("payments"))+'</h1>'
    +'<div class="toolbar"><div class="fld grow"><label>'+esc(t("searchByCustomer"))+'</label><input id="paySearch" value="'+esc(ui.paySearch)+'" placeholder="'+esc(t("searchCustPh"))+'"></div>'
    +'<div class="fld"><label>'+esc(t("direction"))+'</label><select id="payDirSel"><option value="">'+esc(t("allDirections"))+'</option><option value="in"'+(ui.payDir==="in"?" selected":"")+'>'+esc(t("inTxt"))+'</option><option value="out"'+(ui.payDir==="out"?" selected":"")+'>'+esc(t("outTxt"))+'</option></select></div>'
    +'<div class="fld"><label>'+esc(t("from"))+'</label><input type="date" id="payFrom" value="'+esc(ui.payFrom)+'"></div>'
    +'<div class="fld"><label>'+esc(t("to"))+'</label><input type="date" id="payTo" value="'+esc(ui.payTo)+'"></div>'
    +'<button class="btn" data-act="payment-new">'+esc(t("newPayment"))+'</button>'
    +'<button class="btn secondary" data-act="csv" data-mod="payments">'+esc(t("exportCsv"))+'</button></div>'
    +'<div class="cards">'+kpi(t("paymentsIn"),money(totIn))+kpi(t("paymentsOut"),money(totOut))+'</div>';
  if(ui.payDir!=="out"){ h+='<h2>'+esc(t("payGroupedCust"))+'</h2>'+grouped(ins,"customer"); }
  if(ui.payDir!=="in"){ h+='<h2>'+esc(t("payGroupedSupp"))+'</h2>'+grouped(outs,"supplier"); }
  return h;
}
function paymentForm(preset){
  preset=preset||{};
  var body=fld(t("direction"),'<select id="pay_dir"><option value="in"'+(preset.dir==="in"?" selected":"")+'>'+esc(t("inTxt"))+'</option><option value="out"'+(preset.dir==="out"?" selected":"")+'>'+esc(t("outTxt"))+'</option></select>')
    +fld(t("party")+" *",'<select id="pay_party"></select>')
    +fld(t("payAgainst"),'<select id="pay_inv"></select>')
    +'<div id="payInvInfo" class="sub" style="margin:6px 0 0"></div>'
    +'<div class="grid3"><div>'+fld(t("amount")+" *",inp("pay_amt",preset.amount||"","number",'step="0.01" min="0"'))+'</div>'
    +'<div>'+fld(t("date"),inp("pay_date",todayStr(),"date"))+'</div>'
    +'<div>'+fld(t("method"),'<select id="pay_method"><option value="cash">'+esc(t("cash"))+'</option><option value="bank">'+esc(t("bank"))+'</option></select>')+'</div></div>'
    +fld(t("notes"),inp("pay_note",""));
  openModal(t("newPayment"), body, '<button type="button" class="btn" id="paySave">'+esc(t("save"))+'</button>');
  var dirSel=document.getElementById("pay_dir"), partySel=document.getElementById("pay_party"), invSel=document.getElementById("pay_inv");
  function refreshParties(){
    var dir=dirSel.value;
    var parties=dir==="in"?DB.customers:DB.suppliers;
    partySel.innerHTML=selOpts(parties.map(function(c){return {v:c.id,l:c.name};}),preset.partyId,true);
    if(preset.partyId) partySel.value=preset.partyId;
    refreshInvoices();
  }
  function refreshInvoices(){
    var dir=dirSel.value, pid=partySel.value;
    var list=(dir==="in"?DB.salesInvoices:DB.purchaseInvoices).filter(function(inv){
      var owner=dir==="in"?inv.customerId:inv.supplierId;
      return owner===pid && inv.status!=="cancelled";
    });
    invSel.innerHTML='<option value="">'+esc(t("generalPayment"))+'</option>'+list.map(function(inv){ var rem=num(inv.total)-invoicePaid(inv); return '<option value="'+inv.id+'"'+(preset.invoiceId===inv.id?" selected":"")+'>'+esc(inv.number)+' — '+esc(t("total"))+': '+money(inv.total)+' · '+esc(t("remaining"))+': '+money(Math.max(0,rem))+'</option>'; }).join("");
    if(preset.invoiceId) invSel.value=preset.invoiceId;
    updateInvInfo();
  }
  function updateInvInfo(){
    var info=document.getElementById("payInvInfo"); if(!info) return;
    var dir=dirSel.value, invId=invSel.value;
    if(!invId){ info.textContent=""; return; }
    var inv=(dir==="in"?DB.salesInvoices:DB.purchaseInvoices).find(function(x){return x.id===invId;});
    if(!inv){ info.textContent=""; return; }
    var pd=invoicePaid(inv), rem=num(inv.total)-pd;
    info.innerHTML='<strong>'+esc(inv.number)+'</strong> — '+esc(t("invPayInfo"))+': '+money(inv.total)+' / '+money(pd)+' / <strong>'+money(Math.max(0,rem))+'</strong><br>'+esc(t("overpayInfo"));
  }
  dirSel.addEventListener("change",refreshParties);
  partySel.addEventListener("change",refreshInvoices);
  invSel.addEventListener("change",updateInvInfo);
  if(preset.dir) dirSel.value=preset.dir;
  refreshParties();
  document.getElementById("paySave").addEventListener("click",function(){
    var dir=dirSel.value, pid=partySel.value, amt=num(document.getElementById("pay_amt").value);
    if(!pid) return formError(t("required")+" ("+t("party")+")");
    if(amt<=0) return formError(t("invalidAmount"));
    var party=dir==="in"?customerById(pid):supplierById(pid);
    var invId=invSel.value||null; var invNum="";
    if(invId){ var inv=(dir==="in"?DB.salesInvoices:DB.purchaseInvoices).find(function(x){return x.id===invId;}); if(inv) invNum=inv.number; }
    DB.payments.unshift({id:uid("pay"),date:document.getElementById("pay_date").value||todayStr(),dir:dir,partyId:pid,partyName:party?party.name:"",
      amount:amt,method:document.getElementById("pay_method").value,invoiceId:invId,invoiceNumber:invNum,note:document.getElementById("pay_note").value.trim(),
      createdById:me().id,createdByName:me().name});
    logAct("payment",(dir==="in"?"Received ":"Paid ")+money(amt)+" — "+(party?party.name:""));
    save(); closeModal(); toast(t("savedOk")); render();
  });
}

/* ---------------- Expenses ---------------- */
function expensesIdeaHtml(){
  var h='<div style="border:1px solid var(--line);border-radius:var(--radius);background:var(--soft);padding:14px 16px;margin:12px 0">'
    +'<h2 style="margin:0 0 6px">'+esc(t("expIdeaTitle"))+'</h2>'
    +'<p style="margin:0 0 8px">'+esc(t("expIdeaIntro"))+'</p>'
    +'<p style="margin:0 0 10px"><strong>'+esc(t("expIdeaFormula"))+'</strong></p>'
    +'<h3 style="margin:10px 0 4px">'+esc(t("expIdeaDiffTitle"))+'</h3>'
    +'<ul style="margin:4px 0 8px;padding-inline-start:20px"><li>'+esc(t("expIdeaDiff1"))+'</li><li>'+esc(t("expIdeaDiff2"))+'</li><li>'+esc(t("expIdeaDiff3"))+'</li></ul>'
    +'<h3 style="margin:10px 0 4px">'+esc(t("expIdeaHowTitle"))+'</h3>'
    +'<p style="margin:0 0 8px">'+esc(t("expIdeaHow"))+'</p>'
    +'<p style="margin:0;color:var(--muted)">'+esc(t("expIdeaExample"))+'</p></div>';
  return h;
}
function vExpenses(){
  var h='<h1>'+esc(t("expenses"))+'</h1>'+expensesIdeaHtml()+'<div class="cards">'+kpi(t("totalExpenses"),money(expensesTotal()))+kpi(t("count"),fmtN(DB.expenses.length))+'</div>';
  h+='<div class="rowflex" style="margin:12px 0"><button class="btn" data-act="expense-new">'+esc(t("newExpense"))+'</button>'
    +'<button class="btn secondary" data-act="csv" data-mod="expenses">'+esc(t("exportCsv"))+'</button></div>';
  if(!DB.expenses.length) return h+'<div class="empty">'+esc(t("noData"))+'</div>';
  var byCat={}; DB.expenses.forEach(function(e){ byCat[e.category||"Other"]=(byCat[e.category||"Other"]||0)+num(e.amount); });
  h+='<h2>'+esc(t("expByCat"))+'</h2><div class="rowflex">'+Object.keys(byCat).map(function(c){ return '<span class="pill info">'+esc(c)+': '+money(byCat[c])+'</span>'; }).join("")+'</div>';
  h+='<div class="tablewrap" style="margin-top:12px"><table><tr><th>'+esc(t("date"))+'</th><th>'+esc(t("expenseTitle"))+'</th><th>'+esc(t("category"))+'</th><th class="num">'+esc(t("amount"))+'</th><th>'+esc(t("method"))+'</th><th>'+esc(t("notes"))+'</th><th>'+esc(t("actions"))+'</th></tr>';
  DB.expenses.forEach(function(e){
    h+='<tr><td>'+esc(e.date)+'</td><td class="wrapcell"><strong>'+esc(e.title)+'</strong>'+(e.demo?' <span class="pill warn">'+esc(t("demoTag"))+'</span>':'')+'</td><td>'+esc(e.category||"")+'</td><td class="num">'+money(e.amount)+'</td><td>'+esc(e.method==="bank"?t("bank"):t("cash"))+'</td><td>'+esc(e.notes||"")+'</td>'
      +'<td><div class="rowflex" style="gap:6px;flex-wrap:nowrap"><button class="btn secondary small" data-act="expense-edit" data-id="'+e.id+'">'+esc(t("edit"))+'</button><button class="btn danger small" data-act="expense-del" data-id="'+e.id+'">'+esc(t("delete"))+'</button></div></td></tr>';
  });
  return h+'</table></div>';
}
function expenseForm(rec){
  var isNew=!rec; rec=rec||{title:"",category:"",amount:"",date:todayStr(),method:"cash",notes:""};
  var cats=t("expenseCats").split(/[,،]/).map(function(s){return s.trim();}).filter(Boolean);
  if(rec.category&&cats.indexOf(rec.category)<0) cats.unshift(rec.category);
  var body=fld(t("expenseTitle")+" *",inp("ex_title",rec.title))
    +'<div class="grid3"><div>'+fld(t("category"),'<select id="ex_cat">'+selOpts(cats.map(function(c){return {v:c,l:c};}),rec.category)+'</select>')+'</div>'
    +'<div>'+fld(t("amount")+" *",inp("ex_amt",rec.amount,"number",'step="0.01" min="0"'))+'</div>'
    +'<div>'+fld(t("date"),inp("ex_date",rec.date,"date"))+'</div></div>'
    +fld(t("method"),'<select id="ex_method"><option value="cash"'+(rec.method==="cash"?" selected":"")+'>'+esc(t("cash"))+'</option><option value="bank"'+(rec.method==="bank"?" selected":"")+'>'+esc(t("bank"))+'</option></select>')
    +fld(t("notes"),'<textarea id="ex_notes">'+esc(rec.notes||"")+'</textarea>');
  openModal(isNew?t("newExpense"):t("editExpense"), body, '<button type="button" class="btn" id="exSave">'+esc(t("save"))+'</button>');
  document.getElementById("exSave").addEventListener("click",function(){
    var title=document.getElementById("ex_title").value.trim(), amt=num(document.getElementById("ex_amt").value);
    if(!title) return formError(t("required")+" ("+t("expenseTitle")+")");
    if(amt<=0) return formError(t("invalidAmount"));
    var data={title:title,category:document.getElementById("ex_cat").value,amount:amt,date:document.getElementById("ex_date").value||todayStr(),
      method:document.getElementById("ex_method").value,notes:document.getElementById("ex_notes").value.trim()};
    if(isNew){ data.id=uid("ex"); DB.expenses.unshift(data); logAct("create","Expense: "+title+" "+money(amt)); }
    else { Object.assign(rec,data); logAct("edit","Expense: "+title); }
    save(); closeModal(); toast(t("savedOk")); render();
  });
}

/* ---------------- Commissions ---------------- */
function vCommissions(){
  var tot=DB.commissions.reduce(function(s,c){return s+num(c.amount);},0);
  var paidC=commissionsPaidTotal();
  var h='<h1>'+esc(t("commissions"))+'</h1><div class="sub">'+esc(t("commissionsNote"))+'</div>';
  h+='<div class="cards">'+kpi(t("totalCommissions"),money(tot))+kpi(t("paidCommissions"),money(paidC))+kpi(t("unpaidCommissions"),money(tot-paidC))+kpi(t("rate"),fmtN(DB.settings.commissionPct)+"%")+'</div>';
  /* --- Rate control --- */
  h+='<div style="border:1px solid var(--line);border-radius:var(--radius);background:var(--soft);padding:14px 16px;margin:12px 0">'
    +'<h2 style="margin:0 0 6px">'+esc(t("rateControl"))+'</h2><p style="margin:0 0 10px">'+esc(t("rateControlNote"))+'</p>'
    +'<div class="rowflex"><label style="font-weight:600">'+esc(t("commissionPct"))+'</label>'
    +'<input id="commRateInput" type="number" step="0.1" min="0" value="'+esc(DB.settings.commissionPct)+'" style="width:120px">'
    +'<button class="btn" data-act="comm-rate-save">'+esc(t("saveRate"))+'</button></div></div>';
  /* --- Company profit by product --- */
  var byProd={};
  DB.salesInvoices.forEach(function(inv){ if(inv.status==="cancelled") return;
    inv.items.forEach(function(it){
      var k=it.productId||it.name;
      byProd[k]=byProd[k]||{name:it.name,qty:0,rev:0,cost:0};
      byProd[k].qty+=num(it.qty); byProd[k].rev+=num(it.qty)*num(it.price); byProd[k].cost+=num(it.qty)*num(it.cost);
    });
  });
  var prodRows=Object.keys(byProd).map(function(k){ var r=byProd[k]; r.profit=r.rev-r.cost; return r; }).sort(function(a,b){return b.qty-a.qty;});
  var totalQty=prodRows.reduce(function(s,r){return s+r.qty;},0);
  var totalProfit=prodRows.reduce(function(s,r){return s+r.profit;},0);
  var cq=ui.commProdSearch.toLowerCase();
  var prodFiltered=prodRows.filter(function(r){ return !cq || r.name.toLowerCase().indexOf(cq)>=0; });
  h+='<h2>'+esc(t("profitByProduct"))+'</h2><div class="sub">'+esc(t("profitByProductNote"))+'</div>';
  h+='<div class="cards">'+kpi(t("grossProfit"),money(totalProfit))+kpi(t("qtySold"),fmtN(totalQty))+'</div>';
  h+='<div class="toolbar"><div class="fld grow"><label>'+esc(t("searchByProduct"))+'</label><input id="commProdSearch" value="'+esc(ui.commProdSearch)+'" placeholder="'+esc(t("searchPh"))+'"></div></div>';
  if(!prodFiltered.length) h+='<div class="empty">'+esc(t("noData"))+'</div>';
  else{
    h+='<div class="tablewrap"><table><tr><th>'+esc(t("product"))+'</th><th class="num">'+esc(t("qtySold"))+'</th><th class="num">'+esc(t("shareOfSales"))+'</th><th class="num">'+esc(t("revenueCol"))+'</th><th class="num">'+esc(t("costCol"))+'</th><th class="num">'+esc(t("profitCol"))+'</th><th class="num">'+esc(t("margin"))+'</th></tr>';
    prodFiltered.forEach(function(r){
      var share=totalQty>0?(r.qty/totalQty*100).toFixed(1)+"%":"—";
      var marg=r.rev>0?(r.profit/r.rev*100).toFixed(1)+"%":"—";
      h+='<tr><td class="wrapcell"><strong>'+esc(r.name)+'</strong></td><td class="num"><strong>'+fmtN(r.qty)+'</strong></td><td class="num">'+share+'</td><td class="num">'+money(r.rev)+'</td><td class="num">'+money(r.cost)+'</td><td class="num"><strong>'+money(r.profit)+'</strong></td><td class="num">'+marg+'</td></tr>';
    });
    h+='</table></div>';
  }
  /* --- Employee commissions (kept) --- */
  h+='<h2>'+esc(t("commissions"))+' — '+esc(t("employee"))+'</h2>';
  h+='<div class="toolbar"><div class="fld grow"><label>'+esc(t("search"))+'</label><input id="commSearch" value="'+esc(ui.commSearch)+'" placeholder="'+esc(t("searchPh"))+'"></div>'
    +'<button class="btn secondary" data-act="csv" data-mod="commissions">'+esc(t("exportCsv"))+'</button></div>';
  var eq=ui.commSearch.toLowerCase();
  var commList=DB.commissions.filter(function(c){ return !eq || (userName(c.employeeId)+" "+String(c.invoiceNumber||"")).toLowerCase().indexOf(eq)>=0; });
  if(!commList.length) return h+'<div class="empty">'+esc(t("noData"))+'</div>';
  h+='<div class="tablewrap"><table><tr><th>'+esc(t("date"))+'</th><th>'+esc(t("invoiceFor"))+'</th><th>'+esc(t("employee"))+'</th><th class="num">'+esc(t("rate"))+'</th><th class="num">'+esc(t("amount"))+'</th><th>'+esc(t("status"))+'</th><th>'+esc(t("actions"))+'</th></tr>';
  commList.forEach(function(c){
    h+='<tr><td>'+esc(c.date)+'</td><td>'+esc(c.invoiceNumber||"")+'</td><td>'+esc(userName(c.employeeId))+'</td>'
      +'<td class="num"><span style="display:inline-flex;gap:6px;align-items:center;justify-content:flex-end"><input class="comm-rate-one" data-rate-for="'+c.id+'" type="number" step="0.1" min="0" value="'+esc(c.rate)+'" style="width:76px" aria-label="'+esc(t("rate"))+'">% <button class="btn secondary small" data-act="comm-rate-one" data-id="'+c.id+'">'+esc(t("saveRate"))+'</button></span></td>'
      +'<td class="num">'+money(c.amount)+'</td>'
      +'<td>'+(c.paid?'<span class="pill ok">'+esc(t("commPaid"))+'</span>':'<span class="pill warn">'+esc(t("commUnpaid"))+'</span>')+'</td>'
      +'<td><button class="btn secondary small" data-act="comm-toggle" data-id="'+c.id+'">'+esc(c.paid?t("markUnpaid"):t("markPaid"))+'</button></td></tr>';
  });
  return h+'</table></div>';
}

/* ---------------- Cash & Bank accounts ---------------- */
function vAccounts(){
  function flow(method){
    var inn=0,out=0;
    DB.payments.forEach(function(p){ if(p.voided||p.method!==method) return; if(p.dir==="in") inn+=num(p.amount); else out+=num(p.amount); });
    DB.expenses.forEach(function(e){ if(e.method===method) out+=num(e.amount); });
    return {inn:inn,out:out,bal:inn-out};
  }
  var c=flow("cash"), b=flow("bank");
  var h='<h1>'+esc(t("accounts"))+'</h1><div class="sub">'+esc(t("cashFlowNote"))+'</div>';
  h+='<div class="tablewrap"><table><tr><th>'+esc(t("account"))+'</th><th class="num">'+esc(t("inFlow"))+'</th><th class="num">'+esc(t("outFlow"))+'</th><th class="num">'+esc(t("balanceNow"))+'</th></tr>'
    +'<tr><td><strong>'+esc(t("cash"))+'</strong></td><td class="num">'+money(c.inn)+'</td><td class="num">'+money(c.out)+'</td><td class="num"><strong>'+money(c.bal)+'</strong></td></tr>'
    +'<tr><td><strong>'+esc(t("bank"))+'</strong></td><td class="num">'+money(b.inn)+'</td><td class="num">'+money(b.out)+'</td><td class="num"><strong>'+money(b.bal)+'</strong></td></tr>'
    +'<tr><td><strong>'+esc(t("total"))+'</strong></td><td class="num">'+money(c.inn+b.inn)+'</td><td class="num">'+money(c.out+b.out)+'</td><td class="num"><strong>'+money(c.bal+b.bal)+'</strong></td></tr></table></div>';
  /* --- Search + method filter shared by the breakdowns below --- */
  h+='<div class="toolbar"><div class="fld grow"><label>'+esc(t("searchByCustomer"))+'</label><input id="accSearch" value="'+esc(ui.accSearch)+'" placeholder="'+esc(t("searchPh"))+'"></div>'
    +'<div class="fld"><label>'+esc(t("method"))+'</label><select id="accMethodSel"><option value="">'+esc(t("allMethods"))+'</option><option value="cash"'+(ui.accMethod==="cash"?" selected":"")+'>'+esc(t("cash"))+'</option><option value="bank"'+(ui.accMethod==="bank"?" selected":"")+'>'+esc(t("bank"))+'</option></select></div></div>';
  var aq=ui.accSearch.toLowerCase();
  function partyAgg(dir){
    var map={};
    DB.payments.forEach(function(p){
      if(p.voided||p.dir!==dir) return;
      if(ui.accMethod && p.method!==ui.accMethod) return;
      var k=p.partyId||p.partyName||"?";
      map[k]=map[k]||{name:p.partyName||"—",cash:0,bank:0,total:0,count:0,last:""};
      map[k][p.method==="bank"?"bank":"cash"]+=num(p.amount); map[k].total+=num(p.amount); map[k].count++;
      if(!map[k].last||p.date>map[k].last) map[k].last=p.date;
    });
    return Object.keys(map).map(function(k){return map[k];}).filter(function(r){ return !aq || r.name.toLowerCase().indexOf(aq)>=0; }).sort(function(a,b2){return b2.total-a.total;});
  }
  function partyTable(rows, title){
    var hh='<h2>'+esc(title)+'</h2>';
    if(!rows.length) return hh+'<div class="empty">'+esc(t("noData"))+'</div>';
    hh+='<div class="tablewrap"><table><tr><th>'+esc(t("party"))+'</th><th class="num">'+esc(t("cash"))+'</th><th class="num">'+esc(t("bank"))+'</th><th class="num">'+esc(t("total"))+'</th><th class="num">'+esc(t("paymentsCount"))+'</th><th>'+esc(t("lastPayment"))+'</th></tr>';
    rows.forEach(function(r){ hh+='<tr><td class="wrapcell"><strong>'+esc(r.name)+'</strong></td><td class="num">'+money(r.cash)+'</td><td class="num">'+money(r.bank)+'</td><td class="num"><strong>'+money(r.total)+'</strong></td><td class="num">'+fmtN(r.count)+'</td><td>'+esc(r.last||"—")+'</td></tr>'; });
    return hh+'</table></div>';
  }
  h+=partyTable(partyAgg("in"), t("perCustomerTitle"));
  h+=partyTable(partyAgg("out"), t("perSupplierTitle"));
  /* --- Full searchable ledger --- */
  var ledger=[];
  DB.payments.forEach(function(p){ if(p.voided) return; ledger.push({date:p.date,label:p.partyName||"—",sub:(p.dir==="in"?t("paymentsIn"):t("paymentsOut"))+(p.invoiceNumber?" — "+p.invoiceNumber:""),dir:p.dir,method:p.method,amount:num(p.amount)}); });
  DB.expenses.forEach(function(e){ ledger.push({date:e.date,label:e.title||"—",sub:t("expenses")+(e.category?" — "+e.category:""),dir:"out",method:e.method,amount:num(e.amount)}); });
  ledger.sort(function(a,b2){ return a.date<b2.date?1:(a.date>b2.date?-1:0); });
  var ledF=ledger.filter(function(r){
    if(ui.accMethod && r.method!==ui.accMethod) return false;
    if(aq && (r.label+" "+r.sub).toLowerCase().indexOf(aq)<0) return false;
    return true;
  });
  h+='<h2>'+esc(t("ledgerTitle"))+'</h2>';
  if(!ledF.length) h+='<div class="empty">'+esc(t("noData"))+'</div>';
  else{
    h+='<div class="tablewrap"><table><tr><th>'+esc(t("date"))+'</th><th>'+esc(t("party"))+'</th><th>'+esc(t("direction"))+'</th><th>'+esc(t("method"))+'</th><th class="num">'+esc(t("amount"))+'</th></tr>';
    ledF.slice(0,300).forEach(function(r){
      h+='<tr><td>'+esc(r.date)+'</td><td class="wrapcell"><strong>'+esc(r.label)+'</strong><br><small style="color:var(--muted)">'+esc(r.sub)+'</small></td>'
        +'<td>'+(r.dir==="in"?'<span class="pill ok">'+esc(t("inTxt"))+'</span>':'<span class="pill warn">'+esc(t("outTxt"))+'</span>')+'</td>'
        +'<td>'+esc(r.method==="bank"?t("bank"):t("cash"))+'</td><td class="num">'+money(r.amount)+'</td></tr>';
    });
    h+='</table></div>';
  }
  return h;
}

/* ---------------- Financials ---------------- */
function vFinancials(){
  function row(k,v,bold){ return '<tr><td>'+esc(k)+'</td><td class="num">'+(bold?"<strong>":"")+money(v)+(bold?"</strong>":"")+'</td></tr>'; }
  function inF(d){ return (!ui.finFrom||d>=ui.finFrom)&&(!ui.finTo||d<=ui.finTo); }
  /* --- Period totals (filtered by the chosen dates) --- */
  var rev=0,cogs=0;
  DB.salesInvoices.forEach(function(inv){ if(inv.status==="cancelled"||!inF(inv.date)) return; rev+=num(inv.total);
    inv.items.forEach(function(it){ cogs+=num(it.qty)*num(it.cost); }); });
  var gross=rev-cogs;
  var expP=DB.expenses.filter(function(e){return inF(e.date);}).reduce(function(s,e){return s+num(e.amount);},0);
  var cpP=DB.commissions.filter(function(c){return c.paid&&inF(c.date);}).reduce(function(s,c){return s+num(c.amount);},0);
  var colP=DB.payments.filter(function(p){return !p.voided&&p.dir==="in"&&inF(p.date);}).reduce(function(s,p){return s+num(p.amount);},0);
  var outP=DB.payments.filter(function(p){return !p.voided&&p.dir==="out"&&inF(p.date);}).reduce(function(s,p){return s+num(p.amount);},0);
  var h='<h1>'+esc(t("financials"))+'</h1><div class="sub">'+esc(t("finNote"))+'</div>';
  h+='<div class="toolbar"><div class="fld"><label>'+esc(t("from"))+'</label><input type="date" id="finFrom" value="'+esc(ui.finFrom)+'"></div>'
    +'<div class="fld"><label>'+esc(t("to"))+'</label><input type="date" id="finTo" value="'+esc(ui.finTo)+'"></div>'
    +'<button class="btn secondary" data-act="fin-reset">'+esc(t("reset"))+'</button></div>';
  h+='<h2>'+esc(ui.finFrom||ui.finTo?t("finPeriodLbl"):t("finAllTime"))+'</h2>';
  h+='<div class="tablewrap"><table>'
    +row(t("revenue"),rev)+row(t("cogs"),cogs)+row(t("grossProfit"),gross,true)
    +row(t("totalExpenses"),expP)+row(t("paidCommissions"),cpP)+row(t("netProfit"),gross-expP-cpP,true)
    +row(t("collectedCash"),colP)+row(t("paidOutCol"),outP)
    +'</table></div>';
  /* --- Breakdown by month --- */
  var byMonth={};
  function mAdd(m,k,v){ byMonth[m]=byMonth[m]||{rev:0,cogs:0,exp:0,comm:0}; byMonth[m][k]+=v; }
  DB.salesInvoices.forEach(function(inv){ if(inv.status==="cancelled") return; var m=(inv.date||"").slice(0,7); if(!m) return;
    mAdd(m,"rev",num(inv.total)); inv.items.forEach(function(it){ mAdd(m,"cogs",num(it.qty)*num(it.cost)); }); });
  DB.expenses.forEach(function(e){ var m=(e.date||"").slice(0,7); if(m) mAdd(m,"exp",num(e.amount)); });
  DB.commissions.forEach(function(c){ if(!c.paid) return; var m=(c.date||"").slice(0,7); if(m) mAdd(m,"comm",num(c.amount)); });
  var months=Object.keys(byMonth).sort().reverse();
  h+='<h2>'+esc(t("finByMonth"))+'</h2>';
  if(!months.length) h+='<div class="empty">'+esc(t("noData"))+'</div>';
  else{
    h+='<div class="tablewrap"><table><tr><th>'+esc(t("monthCol"))+'</th><th class="num">'+esc(t("revenue"))+'</th><th class="num">'+esc(t("cogs"))+'</th><th class="num">'+esc(t("grossProfit"))+'</th><th class="num">'+esc(t("totalExpenses"))+'</th><th class="num">'+esc(t("paidCommissions"))+'</th><th class="num">'+esc(t("netProfit"))+'</th></tr>';
    months.forEach(function(m){ var r=byMonth[m]; var g=r.rev-r.cogs;
      h+='<tr><td><strong>'+esc(m)+'</strong></td><td class="num">'+money(r.rev)+'</td><td class="num">'+money(r.cogs)+'</td><td class="num">'+money(g)+'</td><td class="num">'+money(r.exp)+'</td><td class="num">'+money(r.comm)+'</td><td class="num"><strong>'+money(g-r.exp-r.comm)+'</strong></td></tr>'; });
    h+='</table></div>';
  }
  /* --- Breakdown by date: cash movement per day (respects the period filter) --- */
  var byDate={};
  function dAdd(d,k,v){ byDate[d]=byDate[d]||{sales:0,col:0,out:0,exp:0}; byDate[d][k]+=v; }
  DB.salesInvoices.forEach(function(inv){ if(inv.status==="cancelled"||!inF(inv.date)) return; dAdd(inv.date,"sales",num(inv.total)); });
  DB.payments.forEach(function(p){ if(p.voided||!inF(p.date)) return; dAdd(p.date,p.dir==="in"?"col":"out",num(p.amount)); });
  DB.expenses.forEach(function(e){ if(!inF(e.date)) return; dAdd(e.date,"exp",num(e.amount)); });
  var dates=Object.keys(byDate).sort().reverse();
  h+='<h2>'+esc(t("finByDate"))+'</h2>';
  if(!dates.length) h+='<div class="empty">'+esc(t("noData"))+'</div>';
  else{
    h+='<div class="tablewrap"><table><tr><th>'+esc(t("date"))+'</th><th class="num">'+esc(t("salesCol"))+'</th><th class="num">'+esc(t("collectedCol"))+'</th><th class="num">'+esc(t("paidOutCol"))+'</th><th class="num">'+esc(t("totalExpenses"))+'</th><th class="num">'+esc(t("cashNet"))+'</th></tr>';
    dates.slice(0,120).forEach(function(d){ var r=byDate[d];
      h+='<tr><td>'+esc(d)+'</td><td class="num">'+money(r.sales)+'</td><td class="num">'+money(r.col)+'</td><td class="num">'+money(r.out)+'</td><td class="num">'+money(r.exp)+'</td><td class="num"><strong>'+money(r.col-r.out-r.exp)+'</strong></td></tr>'; });
    h+='</table></div>';
  }
  /* --- All-time position --- */
  var st=salesTotals(); var cu=DB.commissions.reduce(function(s,c){return s+(c.paid?0:num(c.amount));},0);
  h+='<h2>'+esc(t("finAllTime"))+'</h2><div class="tablewrap"><table>'
    +row(t("revenue"),st.revenue)+row(t("grossProfit"),st.gross,true)
    +row(t("netProfit"),netProfit(),true)
    +row(t("unpaidCommissions")+" ("+t("commUnpaid")+")",cu)
    +row(t("collectedCash"),collectedTotal(),true)+row(t("receivables"),receivablesTotal())+row(t("payables"),payablesTotal())
    +'</table></div>';
  return h;
}

/* ---------------- CRM: leads, kanban, follow-ups ---------------- */
var STAGES=["New Lead","Contacted","Interested","Qualified","Quotation Sent","Negotiation","Won","Lost"];
var STAGE_KEY={"New Lead":"stageNew","Contacted":"stageContacted","Interested":"stageInterested","Qualified":"stageQualified","Quotation Sent":"stageQuotation","Negotiation":"stageNegotiation","Won":"stageWon","Lost":"stageLost"};
function stageLabel(s){ return t(STAGE_KEY[s]||"stageNew"); }
function leadCard(l){
  var td=todayStr(); var due=l.nextFollow&&l.stage!=="Won"&&l.stage!=="Lost";
  var duePill=due?(l.nextFollow<td?'<span class="pill bad">'+esc(t("followOverdue"))+': '+esc(l.nextFollow)+'</span>':(l.nextFollow===td?'<span class="pill warn">'+esc(t("followToday"))+': '+esc(l.nextFollow)+'</span>':'<span class="pill info">'+esc(l.nextFollow)+'</span>')):"";
  var idx=STAGES.indexOf(l.stage);
  var h='<div class="kcard"><div class="nm">'+esc(l.name)+'</div>'
    +'<div class="meta">'+esc(l.company||"")+(l.company&&l.phone?" · ":"")+esc(l.phone||"")+'</div>'
    +(num(l.value)?'<div class="meta">'+esc(t("estValue"))+': '+money(l.value)+'</div>':"")
    +'<div class="meta">'+esc(t("employee"))+': '+esc(userName(l.employeeId))+'</div>'+duePill
    +(l.stage==="Lost"&&l.lostReason?'<div class="meta">'+esc(t("lostReason"))+': '+esc(l.lostReason)+'</div>':"")
    +(l.customerId?'<div class="meta"><span class="pill ok">'+esc(t("convertCust"))+'</span></div>':"")
    +'<div class="kbtns">'
    +(idx>0&&l.stage!=="Won"?'<button class="btn secondary small" data-act="lead-move" data-dir="-1" data-id="'+l.id+'">'+esc(t("moveBack"))+'</button>':"")
    +(idx<STAGES.length-2?'<button class="btn small" data-act="lead-move" data-dir="1" data-id="'+l.id+'">'+esc(t("moveNext"))+'</button>':"")
    +(l.stage!=="Won"&&l.stage!=="Lost"?'<button class="btn secondary small" data-act="lead-won" data-id="'+l.id+'">'+esc(t("stageWon"))+'</button><button class="btn danger small" data-act="lead-lost" data-id="'+l.id+'">'+esc(t("stageLost"))+'</button>':"")
    +'</div><div class="kbtns"><button class="btn secondary small" data-act="lead-follow" data-id="'+l.id+'">'+esc(t("addFollow"))+'</button>'
    +'<button class="btn secondary small" data-act="lead-edit" data-id="'+l.id+'">'+esc(t("edit"))+'</button>'
    +'<button class="btn secondary small" data-act="lead-quote" data-id="'+l.id+'">'+esc(t("quotationsNew"))+'</button></div></div>';
  return h;
}
function vCrm(){
  var h='<h1>'+esc(t("crm"))+'</h1><div class="rowflex" style="margin:12px 0"><button class="btn" data-act="lead-new">'+esc(t("newLead"))+'</button>'
    +'<button class="btn secondary" data-act="lead-view" data-v="kanban">'+esc(t("leadsPipeline"))+'</button>'
    +'<button class="btn secondary" data-act="lead-view" data-v="list">'+esc(t("leadsList"))+'</button>'
    +'<button class="btn secondary" data-act="csv" data-mod="leads">'+esc(t("exportCsv"))+'</button></div>';
  if(!DB.leads.length) return h+'<div class="empty">'+esc(t("noData"))+'</div>';
  if(ui.leadView==="list"){
    h+='<div class="tablewrap"><table><tr><th>'+esc(t("name"))+'</th><th>'+esc(t("company"))+'</th><th>'+esc(t("phone"))+'</th><th>'+esc(t("stage"))+'</th><th class="num">'+esc(t("estValue"))+'</th><th>'+esc(t("nextFollow"))+'</th><th>'+esc(t("employee"))+'</th><th>'+esc(t("actions"))+'</th></tr>';
    DB.leads.forEach(function(l){
      h+='<tr><td class="wrapcell"><strong>'+esc(l.name)+'</strong>'+(l.demo?' <span class="pill warn">'+esc(t("demoTag"))+'</span>':'')+'</td><td>'+esc(l.company||"")+'</td><td>'+esc(l.phone||"")+'</td><td>'+esc(stageLabel(l.stage))+'</td><td class="num">'+money(l.value)+'</td><td>'+esc(l.nextFollow||"—")+'</td><td>'+esc(userName(l.employeeId))+'</td>'
        +'<td><div class="rowflex" style="gap:6px;flex-wrap:nowrap"><button class="btn secondary small" data-act="lead-follow" data-id="'+l.id+'">'+esc(t("addFollow"))+'</button><button class="btn secondary small" data-act="lead-edit" data-id="'+l.id+'">'+esc(t("edit"))+'</button><button class="btn danger small" data-act="lead-del" data-id="'+l.id+'">'+esc(t("delete"))+'</button></div></td></tr>';
    });
    return h+'</table></div>';
  }
  h+='<div class="kanban">';
  STAGES.forEach(function(st){
    var cards=DB.leads.filter(function(l){return l.stage===st;});
    h+='<div class="kcol"><h3><span>'+esc(stageLabel(st))+'</span><span class="pill info">'+cards.length+'</span></h3>'
      +(cards.length?cards.map(leadCard).join(""):'<div class="meta" style="color:var(--muted);font-size:12.5px">'+esc(t("noData"))+'</div>')+'</div>';
  });
  return h+'</div>';
}
function leadForm(rec){
  var isNew=!rec; rec=rec||{name:"",company:"",phone:"",email:"",source:"",value:"",stage:"New Lead",nextFollow:"",notes:"",employeeId:DB.settings.userId};
  var sources=t("leadSources").split(/[,،]/).map(function(s){return s.trim();}).filter(Boolean);
  if(rec.source&&sources.indexOf(rec.source)<0) sources.unshift(rec.source);
  var body='<div class="grid2"><div>'+fld(t("contactName")+" *",inp("ld_name",rec.name))+'</div><div>'+fld(t("company"),inp("ld_company",rec.company))+'</div></div>'
    +'<div class="grid2"><div>'+fld(t("phone"),inp("ld_phone",rec.phone))+'</div><div>'+fld(t("email"),inp("ld_email",rec.email))+'</div></div>'
    +'<div class="grid3"><div>'+fld(t("source"),'<select id="ld_source">'+selOpts(sources.map(function(s){return {v:s,l:s};}),rec.source,true)+'</select>')+'</div>'
    +'<div>'+fld(t("leadValue"),inp("ld_value",rec.value,"number",'step="0.01" min="0"'))+'</div>'
    +'<div>'+fld(t("nextFollow"),inp("ld_next",rec.nextFollow,"date"))+'</div></div>'
    +'<div class="grid2"><div>'+fld(t("stage"),'<select id="ld_stage">'+selOpts(STAGES.map(function(s){return {v:s,l:stageLabel(s)};}),rec.stage)+'</select>')+'</div>'
    +'<div>'+fld(t("employee"),'<select id="ld_emp">'+selOpts(DB.users.map(function(u){return {v:u.id,l:u.name};}),rec.employeeId||DB.settings.userId)+'</select>')+'</div></div>'
    +'<div id="ld_lostWrap" style="display:'+(rec.stage==="Lost"?"block":"none")+'">'+fld(t("lostReason"),inp("ld_lost",rec.lostReason||""))+'</div>'
    +fld(t("notes"),'<textarea id="ld_notes">'+esc(rec.notes||"")+'</textarea>');
  openModal(isNew?t("newLead"):t("editLead"), body, '<button type="button" class="btn" id="ldSave">'+esc(t("save"))+'</button>', true);
  var stageSel=document.getElementById("ld_stage");
  stageSel.addEventListener("change",function(){ document.getElementById("ld_lostWrap").style.display=stageSel.value==="Lost"?"block":"none"; });
  document.getElementById("ldSave").addEventListener("click",function(){
    var name=document.getElementById("ld_name").value.trim();
    if(!name) return formError(t("required")+" ("+t("contactName")+")");
    var stage=stageSel.value, lost=document.getElementById("ld_lost").value.trim();
    if(stage==="Lost"&&!lost) return formError(t("lostReasonReq"));
    var data={name:name,company:document.getElementById("ld_company").value.trim(),phone:document.getElementById("ld_phone").value.trim(),
      email:document.getElementById("ld_email").value.trim(),source:document.getElementById("ld_source").value,
      value:num(document.getElementById("ld_value").value),stage:stage,lostReason:stage==="Lost"?lost:(rec.lostReason||""),
      nextFollow:document.getElementById("ld_next").value,notes:document.getElementById("ld_notes").value.trim(),
      employeeId:document.getElementById("ld_emp").value};
    if(isNew){ data.id=uid("ld"); data.followLog=[]; DB.leads.unshift(data); logAct("create","Lead: "+name); rec=data; }
    else { Object.assign(rec,data); logAct("edit","Lead: "+name); }
    if(stage==="Won") convertLeadToCustomer(rec);
    save(); closeModal(); toast(t("savedOk")); render();
  });
}
function convertLeadToCustomer(l){
  if(l.customerId) return;
  var existing=DB.customers.find(function(c){ return (l.phone&&c.phone===l.phone)||c.name===l.name; });
  if(existing){ l.customerId=existing.id; return; }
  var c={id:uid("c"),name:l.company||l.name,phone:l.phone||"",whatsapp:"",email:l.email||"",address:"",openingBalance:0,notes:"From lead: "+l.name};
  DB.customers.push(c); l.customerId=c.id; logAct("create","Customer from lead: "+c.name);
}
function moveLead(id, dir){
  var l=DB.leads.find(function(x){return x.id===id;}); if(!l) return;
  var idx=STAGES.indexOf(l.stage); var nIdx=idx+dir;
  if(nIdx<0||nIdx>STAGES.length-3) return; // Won/Lost handled by dedicated buttons
  l.stage=STAGES[nIdx]; logAct("edit","Lead "+l.name+" → "+l.stage);
  save(); toast(t("leadStageChanged")); render();
}
function leadLost(id){
  var l=DB.leads.find(function(x){return x.id===id;}); if(!l) return;
  openModal(t("stageLost"), fld(t("lostReason")+" *",inp("lost_reason","")),
    '<button type="button" class="btn danger" id="lostSave">'+esc(t("save"))+'</button>');
  document.getElementById("lostSave").addEventListener("click",function(){
    var r=document.getElementById("lost_reason").value.trim();
    if(!r) return formError(t("lostReasonReq"));
    l.stage="Lost"; l.lostReason=r; logAct("edit","Lead lost: "+l.name+" — "+r);
    save(); closeModal(); toast(t("leadStageChanged")); render();
  });
}
function leadWon(id){
  var l=DB.leads.find(function(x){return x.id===id;}); if(!l) return;
  l.stage="Won"; convertLeadToCustomer(l); logAct("edit","Lead won: "+l.name);
  save(); toast(t("leadWonMsg")); render();
}
function followForm(id){
  var l=DB.leads.find(function(x){return x.id===id;}); if(!l) return;
  var logHtml=(l.followLog&&l.followLog.length)?'<h3>'+esc(t("followLog"))+'</h3>'+l.followLog.slice().reverse().map(function(f){return '<div style="border-bottom:1px solid var(--line);padding:6px 0"><small style="color:var(--muted)">'+esc(f.date)+' — '+esc(f.by)+'</small><br>'+esc(f.note)+'</div>';}).join(""):"";
  var body=fld(t("notes"),'<textarea id="fw_note" placeholder="'+esc(t("followNotePh"))+'"></textarea>')
    +fld(t("nextDate"),inp("fw_next","","date"))+logHtml;
  openModal(t("addFollow")+" — "+l.name, body, '<button type="button" class="btn" id="fwSave">'+esc(t("reschedule"))+'</button>');
  document.getElementById("fwSave").addEventListener("click",function(){
    var note=document.getElementById("fw_note").value.trim(), next=document.getElementById("fw_next").value;
    l.followLog=l.followLog||[];
    if(note) l.followLog.push({date:todayStr(),note:note,by:me().name});
    l.nextFollow=next||"";
    logAct("edit","Follow-up: "+l.name+(note?" — "+note:""));
    save(); closeModal(); toast(t("savedOk")); render();
  });
}
function vFollowups(){
  var td=todayStr();
  var open=DB.leads.filter(function(l){return l.stage!=="Won"&&l.stage!=="Lost"&&l.nextFollow;});
  var over=open.filter(function(l){return l.nextFollow<td;});
  var dueT=open.filter(function(l){return l.nextFollow===td;});
  var up=open.filter(function(l){return l.nextFollow>td;}).sort(function(a,b){return a.nextFollow<b.nextFollow?-1:1;});
  function tbl(list){
    if(!list.length) return '<div class="empty">'+esc(t("noData"))+'</div>';
    var h='<div class="tablewrap"><table><tr><th>'+esc(t("lead"))+'</th><th>'+esc(t("company"))+'</th><th>'+esc(t("phone"))+'</th><th>'+esc(t("stage"))+'</th><th>'+esc(t("nextFollow"))+'</th><th>'+esc(t("actions"))+'</th></tr>';
    list.forEach(function(l){ h+='<tr><td class="wrapcell"><strong>'+esc(l.name)+'</strong></td><td>'+esc(l.company||"")+'</td><td>'+esc(l.phone||"")+'</td><td>'+esc(stageLabel(l.stage))+'</td><td>'+esc(l.nextFollow)+'</td><td><button class="btn secondary small" data-act="lead-follow" data-id="'+l.id+'">'+esc(t("addFollow"))+'</button></td></tr>'; });
    return h+'</table></div>';
  }
  return '<h1>'+esc(t("followups"))+'</h1><h2>'+esc(t("followOverdue"))+' ('+over.length+')</h2>'+tbl(over)
    +'<h2>'+esc(t("followToday"))+' ('+dueT.length+')</h2>'+tbl(dueT)
    +'<h2>'+esc(t("followUpcoming"))+' ('+up.length+')</h2>'+tbl(up);
}

/* ---------------- Quotations ---------------- */
function vQuotations(){
  var h='<h1>'+esc(t("quotations"))+'</h1><div class="rowflex" style="margin:12px 0"><button class="btn" data-act="quote-new">'+esc(t("quotationsNew"))+'</button>'
    +'<button class="btn secondary" data-act="csv" data-mod="quotations">'+esc(t("exportCsv"))+'</button></div>';
  if(!DB.quotations.length) return h+'<div class="empty">'+esc(t("noData"))+'</div>';
  var stKey={Draft:"quoteStatusDraft",Sent:"quoteStatusSent",Accepted:"quoteStatusAccepted",Rejected:"quoteStatusRejected",Converted:"quoteStatusConverted"};
  h+='<div class="tablewrap"><table><tr><th>'+esc(t("number"))+'</th><th>'+esc(t("date"))+'</th><th>'+esc(t("forCustomer"))+'</th><th class="num">'+esc(t("total"))+'</th><th>'+esc(t("status"))+'</th><th>'+esc(t("validUntil"))+'</th><th>'+esc(t("actions"))+'</th></tr>';
  DB.quotations.forEach(function(q){
    h+='<tr><td><strong>'+esc(q.number)+'</strong>'+(q.demo?' <span class="pill warn">'+esc(t("demoTag"))+'</span>':'')+'</td><td>'+esc(q.date)+'</td><td class="wrapcell">'+esc(q.partyName||"")+'</td><td class="num">'+money(q.total)+'</td>'
      +'<td><select data-quote-status="'+q.id+'" '+(q.status==="Converted"?"disabled":"")+' style="width:auto">'
      +["Draft","Sent","Accepted","Rejected","Converted"].map(function(s){ return '<option value="'+s+'"'+(q.status===s?" selected":"")+(s==="Converted"?" disabled":"")+'>'+esc(t(stKey[s]))+'</option>'; }).join("")+'</select></td>'
      +'<td>'+esc(q.validUntil||"—")+'</td>'
      +'<td><div class="rowflex" style="gap:6px;flex-wrap:nowrap"><button class="btn secondary small" data-act="quote-print" data-id="'+q.id+'">'+esc(t("print"))+'</button>'
      +(q.status!=="Converted"?'<button class="btn small" data-act="quote-convert" data-id="'+q.id+'">'+esc(t("convertToInvoice"))+'</button>':"")
      +'<button class="btn danger small" data-act="quote-del" data-id="'+q.id+'">'+esc(t("delete"))+'</button></div></td></tr>';
    h+='<tr><td colspan="7" style="background:var(--soft);white-space:normal"><small>'+q.items.map(function(it){return esc(it.name)+" × "+fmtN(it.qty)+" @ "+money(it.price);}).join(" · ")+'</small></td></tr>';
  });
  return h+'</table></div>';
}
function quoteForm(presetLead){
  var body=fld(t("forCustomer")+" *",inp("q_party",presetLead?(presetLead.company||presetLead.name):""))
    +'<div class="grid2"><div>'+fld(t("date"),inp("q_date",todayStr(),"date"))+'</div><div>'+fld(t("validUntil"),inp("q_valid","","date"))+'</div></div>'
    +'<h3>'+esc(t("items"))+'</h3>'+itemsEditorHtml("sales",null)
    +fld(t("notes"),'<textarea id="q_notes"></textarea>');
  openModal(t("quotationsNew"), body, '<button type="button" class="btn" id="qSave">'+esc(t("save"))+'</button>', true);
  document.getElementById("inv_paid").closest("div").style.display="none";
  document.getElementById("inv_method").closest("div").style.display="none";
  wireItems("sales");
  document.getElementById("qSave").addEventListener("click",function(){
    var party=document.getElementById("q_party").value.trim();
    if(!party) return formError(t("required")+" ("+t("forCustomer")+")");
    var rd=readItems("sales"); if(rd.error) return formError(rd.error);
    var sub=rd.items.reduce(function(s,it){return s+it.qty*it.price;},0);
    var discount=Math.min(num(document.getElementById("inv_discount").value),sub);
    var q={ id:uid("q"), number:"QT-"+(DB.counters.quote++), date:document.getElementById("q_date").value||todayStr(),
      partyName:party, leadId:presetLead?presetLead.id:null, customerId:presetLead?presetLead.customerId:null,
      items:rd.items, discount:discount, total:sub-discount, status:"Draft", validUntil:document.getElementById("q_valid").value,
      notes:document.getElementById("q_notes").value.trim(), employeeId:DB.settings.userId };
    DB.quotations.unshift(q);
    if(presetLead && presetLead.stage!=="Won" && presetLead.stage!=="Lost"){ presetLead.stage="Quotation Sent"; }
    logAct("create","Quotation "+q.number+" — "+money(q.total));
    save(); closeModal(); toast(t("quotationSaved")); render();
  });
}
function printQuote(id){
  var q=DB.quotations.find(function(x){return x.id===id;}); if(!q) return;
  var rows=q.items.map(function(it,i){ return '<tr><td>'+(i+1)+'</td><td>'+esc(it.name)+'</td><td style="text-align:end">'+fmtN(it.qty)+'</td><td style="text-align:end">'+money(it.price)+'</td><td style="text-align:end">'+money(it.qty*it.price)+'</td></tr>'; }).join("");
  var doc='<div class="docbox"><div class="dhead"><div><div class="dbrand">Epsilon</div><div>'+esc(t("quotation"))+'</div></div>'
    +'<div style="text-align:end"><div><strong>'+esc(q.number)+'</strong></div><div>'+esc(t("date"))+': '+esc(q.date)+'</div>'+(q.validUntil?'<div>'+esc(t("validUntil"))+': '+esc(q.validUntil)+'</div>':"")+'</div></div>'
    +'<p><strong>'+esc(t("forCustomer"))+':</strong> '+esc(q.partyName||"")+'</p>'
    +'<table><tr><th>#</th><th>'+esc(t("product"))+'</th><th style="text-align:end">'+esc(t("quantity"))+'</th><th style="text-align:end">'+esc(t("price"))+'</th><th style="text-align:end">'+esc(t("lineTotal"))+'</th></tr>'+rows+'</table>'
    +'<table style="margin-top:12px;max-width:320px;margin-inline-start:auto"><tr><td>'+esc(t("discount"))+'</td><td style="text-align:end">'+money(q.discount)+'</td></tr><tr><td><strong>'+esc(t("grandTotal"))+'</strong></td><td style="text-align:end"><strong>'+money(q.total)+'</strong></td></tr></table>'
    +(q.notes?'<p style="margin-top:14px">'+esc(q.notes)+'</p>':"")
    +'<p style="margin-top:16px;color:#555">'+esc(t("terms"))+'</p>'
    +'<div class="sig"><span>'+esc(t("preparedBy"))+': '+esc(userName(q.employeeId))+'</span><span>'+esc(t("signature"))+': ____________</span></div></div>'
    +'<div class="rowflex" style="margin-top:14px" data-noprint="1"><button class="btn secondary" id="backBtn">'+esc(t("backToApp"))+'</button></div>';
  var app=document.getElementById("app"); app.innerHTML=doc;
  document.getElementById("printDoc").innerHTML=doc.replace(/ data-noprint="1"/g,' style="display:none"');
  document.getElementById("backBtn").addEventListener("click",function(){ document.getElementById("printDoc").innerHTML=""; render(); });
  window.scrollTo(0,0);
}
function convertQuote(id){
  var q=DB.quotations.find(function(x){return x.id===id;}); if(!q) return;
  if(q.status==="Converted") return toast(t("alreadyConverted"));
  var custId=q.customerId;
  if(!custId && q.leadId){ var l=DB.leads.find(function(x){return x.id===q.leadId;}); if(l&&l.customerId) custId=l.customerId; }
  if(!custId){
    var match=DB.customers.find(function(c){return c.name===q.partyName;});
    if(match) custId=match.id;
  }
  if(!custId){
    var c={id:uid("c"),name:q.partyName,phone:"",whatsapp:"",email:"",address:"",openingBalance:0,notes:"From quotation "+q.number};
    DB.customers.push(c); custId=c.id;
  }
  var presetItems=q.items.map(function(it){ return {productId:it.productId,qty:it.qty,price:it.price}; });
  ui.pendingQuoteId=id;
  invoiceForm("sales",{partyId:custId,items:presetItems,discount:q.discount});
  // after invoice save, mark converted — handled in global save hook below via ui.pendingQuoteId check in render? Use interval-free approach: patch by wrapping save button
  var btn=document.getElementById("invSave");
  if(btn){ var orig=btn.onclick; btn.addEventListener("click",function(){
    setTimeout(function(){
      var q2=DB.quotations.find(function(x){return x.id===id;});
      if(q2 && document.getElementById("modalRoot").innerHTML===""){ q2.status="Converted"; if(q.leadId){ var l2=DB.leads.find(function(x){return x.id===q.leadId;}); if(l2&&l2.stage!=="Won"){ l2.stage="Won"; convertLeadToCustomer(l2); } } save(); render(); }
    },50);
  }); }
}

/* ---------------- Reports ---------------- */
function inPeriod(d){ return (!ui.repFrom||d>=ui.repFrom)&&(!ui.repTo||d<=ui.repTo); }
function vReports(){
  var h='<h1>'+esc(t("reportsTitle"))+'</h1>';
  h+='<div class="toolbar"><div class="fld"><label>'+esc(t("reportType"))+'</label><select id="repType">'
    +[["sales","repSales"],["products","repProducts"],["customers","repCustomers"],["expenses","repExpenses"],["stock","repStock"]].map(function(o){return '<option value="'+o[0]+'"'+(ui.repType===o[0]?" selected":"")+'>'+esc(t(o[1]))+'</option>';}).join("")+'</select></div>'
    +'<div class="fld"><label>'+esc(t("from"))+'</label><input type="date" id="repFrom" value="'+esc(ui.repFrom)+'"></div>'
    +'<div class="fld"><label>'+esc(t("to"))+'</label><input type="date" id="repTo" value="'+esc(ui.repTo)+'"></div>'
    +'<button class="btn" data-act="rep-run">'+esc(t("runReport"))+'</button>'
    +'<button class="btn secondary" data-act="rep-csv">'+esc(t("exportCsv"))+'</button></div>';
  h+='<div id="repBody">'+reportHtml()+'</div>';
  return h;
}
function reportData(){
  var type=ui.repType, head=[], rows=[];
  if(type==="sales"){
    head=[t("number"),t("date"),t("customer"),t("employee"),t("total"),t("paid"),t("remaining"),t("status")];
    DB.salesInvoices.filter(function(i){return inPeriod(i.date);}).forEach(function(inv){
      var paid=invoicePaid(inv); var party=customerById(inv.customerId);
      rows.push([inv.number,inv.date,party?party.name:inv.partyName||"",userName(inv.employeeId),num(inv.total).toFixed(2),paid.toFixed(2),(num(inv.total)-paid).toFixed(2),t(invStatus(inv)==="paid"?"statusPaid":invStatus(inv)==="partial"?"statusPartial":invStatus(inv)==="cancelled"?"statusCancelled":"statusUnpaid")]);
    });
  } else if(type==="products"){
    head=[t("product"),t("stock"),t("purchaseCost"),t("sellingPrice"),t("qtySold"),t("revenueCol"),t("profitCol")];
    var sold={};
    DB.salesInvoices.forEach(function(inv){ if(inv.status==="cancelled"||!inPeriod(inv.date)) return;
      inv.items.forEach(function(it){ sold[it.productId]=sold[it.productId]||{qty:0,rev:0,prof:0}; sold[it.productId].qty+=num(it.qty); sold[it.productId].rev+=num(it.qty)*num(it.price); sold[it.productId].prof+=num(it.qty)*(num(it.price)-num(it.cost)); }); });
    DB.products.forEach(function(p){ var s=sold[p.id]||{qty:0,rev:0,prof:0};
      rows.push([p.name,num(p.qty),num(p.cost).toFixed(2),num(p.price).toFixed(2),s.qty,s.rev.toFixed(2),s.prof.toFixed(2)]); });
  } else if(type==="customers"){
    head=[t("customer"),t("phone"),t("whatsapp"),t("address"),t("balance")];
    DB.customers.forEach(function(c){ rows.push([c.name,c.phone||"",c.whatsapp||"",c.address||"",customerBalance(c.id).toFixed(2)]); });
  } else if(type==="expenses"){
    head=[t("date"),t("expenseTitle"),t("category"),t("amount"),t("method")];
    DB.expenses.filter(function(e){return inPeriod(e.date);}).forEach(function(e){ rows.push([e.date,e.title,e.category||"",num(e.amount).toFixed(2),e.method==="bank"?t("bank"):t("cash")]); });
  } else {
    head=[t("product"),t("category"),t("stock"),t("minStock"),t("purchaseCost"),t("stockValue")];
    DB.products.forEach(function(p){ rows.push([p.name,p.category||"",num(p.qty),num(p.minStock),num(p.cost).toFixed(2),(num(p.qty)*num(p.cost)).toFixed(2)]); });
  }
  return {head:head, rows:rows};
}
function reportHtml(){
  var d=reportData(); var type=ui.repType; var h="";
  if(type==="sales"){
    var tot=0,col=0,prof=0;
    DB.salesInvoices.forEach(function(inv){ if(inv.status==="cancelled"||!inPeriod(inv.date)) return; tot+=num(inv.total);
      inv.items.forEach(function(it){ prof+=num(it.qty)*(num(it.price)-num(it.cost)); }); });
    DB.payments.forEach(function(p){ if(!p.voided&&p.dir==="in"&&inPeriod(p.date)) col+=num(p.amount); });
    var exp=DB.expenses.filter(function(e){return inPeriod(e.date);}).reduce(function(s,e){return s+num(e.amount);},0);
    h+='<div class="cards">'+kpi(t("totalSalesPeriod"),money(tot))+kpi(t("totalCollectedPeriod"),money(col))+kpi(t("profitPeriod"),money(prof))+kpi(t("expensesPeriod"),money(exp))+'</div>';
  }
  if(!d.rows.length) return h+'<div class="empty">'+esc(t("noData"))+'</div>';
  h+='<div class="tablewrap"><table><tr>'+d.head.map(function(x){return '<th>'+esc(x)+'</th>';}).join("")+'</tr>'
    +d.rows.map(function(r){ return '<tr>'+r.map(function(c,i){ return '<td'+(i>2?' class="num"':' class="wrapcell"')+'>'+esc(c)+'</td>'; }).join("")+'</tr>'; }).join("")+'</table></div>';
  return h;
}

/* ---------------- Activity / Users / Settings ---------------- */
function vActivity(){
  var h='<h1>'+esc(t("activityLog"))+'</h1><div class="rowflex" style="margin:12px 0"><button class="btn secondary" data-act="csv" data-mod="activity">'+esc(t("exportCsv"))+'</button></div>';
  if(!DB.activity.length) return h+'<div class="empty">'+esc(t("noData"))+'</div>';
  h+='<div class="tablewrap"><table><tr><th>'+esc(t("when"))+'</th><th>'+esc(t("who"))+'</th><th>'+esc(t("action"))+'</th><th>'+esc(t("detail"))+'</th></tr>';
  DB.activity.slice(0,300).forEach(function(a){ h+='<tr><td style="white-space:nowrap">'+esc(a.ts)+'</td><td>'+esc(a.user)+'</td><td>'+esc(a.action)+'</td><td class="wrapcell">'+esc(a.detail)+'</td></tr>'; });
  return h+'</table></div>';
}
function vUsers(){
  var admins=DB.users.filter(function(u){return u.role==="admin";}).length;
  var salesN=DB.users.filter(function(u){return u.role!=="admin";}).length;
  var h='<h1>'+esc(t("usersTitle"))+'</h1><div class="sub">'+esc(t("usersNote"))+' '+esc(t("usersListNote"))+'</div>';
  h+='<div class="okbox">'+esc(t("shareNote"))+'</div>';
  h+='<div class="cards">'+kpi(t("totalUsers"),fmtN(DB.users.length))+kpi(t("totalAdmins"),fmtN(admins))+kpi(t("totalSales"),fmtN(salesN))+'</div>';
  h+='<div class="rowflex" style="margin:12px 0"><button class="btn" data-act="user-new">'+esc(t("addUser"))+'</button></div>';
  if(!DB.users.length) return h+'<div class="empty">'+esc(t("noData"))+'</div>';
  h+='<div class="tablewrap"><table><tr><th>'+esc(t("name"))+'</th><th>'+esc(t("username"))+'</th><th>'+esc(t("role"))+'</th><th>'+esc(t("phone"))+' / '+esc(t("email"))+'</th><th>'+esc(t("status"))+'</th><th>'+esc(t("perms"))+'</th><th>'+esc(t("actions"))+'</th></tr>';
  DB.users.forEach(function(u){
    var isCur=loggedUser()&&u.id===loggedUser().id;
    var isOff=u.active===false;
    h+='<tr'+(isOff?' style="opacity:.6"':'')+'><td class="wrapcell"><strong>'+esc(u.name)+'</strong>'+(isCur?' <span class="pill ok">'+esc(t("isActiveUser"))+'</span>':"")+'</td>'
      +'<td><strong>'+esc(u.username||"—")+'</strong>'+(u.passwordHash?"":'<br><span class="pill warn">'+esc(t("noPasswordSet"))+'</span>')+'</td>'
      +'<td>'+(u.role==="admin"?'<span class="pill info">'+esc(t("admin"))+'</span>':'<span class="pill grey">'+esc(t("salesRole"))+'</span>')+'</td>'
      +'<td>'+esc([u.phone,u.email].filter(Boolean).join(" · ")||"—")+'</td>'
      +'<td>'+(isOff?'<span class="pill bad">'+esc(t("inactiveLbl"))+'</span>':'<span class="pill ok">'+esc(t("activeLbl"))+'</span>')+'</td>'
      +'<td class="wrapcell" style="white-space:normal;min-width:200px"><small>'+esc(u.role==="admin"?t("roleAdminDesc"):t("roleSalesDesc"))+'</small></td>'
      +'<td><div class="rowflex" style="gap:6px;flex-wrap:wrap">'
      +'<button class="btn secondary small" data-act="user-edit" data-id="'+u.id+'">'+esc(t("edit"))+'</button>'
      +'<button class="btn secondary small" data-act="user-toggle" data-id="'+u.id+'">'+esc(isOff?t("activate"):t("deactivate"))+'</button>'
      +'<button class="btn danger small" data-act="user-del" data-id="'+u.id+'">'+esc(t("delete"))+'</button>'
      +'</div></td></tr>';
  });
  return h+'</table></div>';
}
function userForm(rec){
  var isNew=!rec; rec=rec||{name:"",username:"",role:"sales",phone:"",email:"",active:true};
  var body=fld(t("name")+" *",inp("us_name",rec.name))
    +'<div class="grid2"><div>'+fld(t("username")+" *",inp("us_username",rec.username||"",'text','autocapitalize="none" spellcheck="false"'))+'</div>'
    +'<div>'+fld(isNew?t("password")+" *":t("newPassword"),inp("us_pass","","password",'autocomplete="new-password"'))+(isNew?"":'<div class="sub" style="margin:2px 0 0">'+esc(t("passwordKeep"))+'</div>')+'</div></div>'
    +'<div class="grid2"><div>'+fld(t("role"),'<select id="us_role"><option value="admin"'+(rec.role==="admin"?" selected":"")+'>'+esc(t("admin"))+' — '+esc(t("roleAdminDesc"))+'</option><option value="sales"'+(rec.role!=="admin"?" selected":"")+'>'+esc(t("salesRole"))+' — '+esc(t("roleSalesDesc"))+'</option></select>')+'</div>'
    +'<div>'+fld(t("status"),'<select id="us_active"><option value="1"'+(rec.active!==false?" selected":"")+'>'+esc(t("activeLbl"))+'</option><option value="0"'+(rec.active===false?" selected":"")+'>'+esc(t("inactiveLbl"))+'</option></select>')+'</div></div>'
    +'<div class="grid2"><div>'+fld(t("phone"),inp("us_phone",rec.phone||""))+'</div><div>'+fld(t("email"),inp("us_email",rec.email||""))+'</div></div>'
    +'<div class="sub" style="margin-top:10px">'+esc(t("usersNote"))+'</div>';
  openModal(isNew?t("addUser"):t("editUser"), body, '<button type="button" class="btn" id="usSave">'+esc(t("save"))+'</button>');
  document.getElementById("usSave").addEventListener("click",function(){
    var name=document.getElementById("us_name").value.trim();
    if(!name) return formError(t("required")+" ("+t("name")+")");
    var username=document.getElementById("us_username").value.trim().toLowerCase();
    if(!username) return formError(t("required")+" ("+t("username")+")");
    var clash=DB.users.find(function(u){ return String(u.username||"").toLowerCase()===username && (isNew||u.id!==rec.id); });
    if(clash) return formError(t("usernameTaken"));
    var pass=document.getElementById("us_pass").value;
    if(isNew && pass.length<4) return formError(t("passwordMin"));
    if(!isNew && pass && pass.length<4) return formError(t("passwordMin"));
    if(!isNew && !pass && !rec.passwordHash) return formError(t("passwordMin"));
    var role=document.getElementById("us_role").value;
    var active=document.getElementById("us_active").value==="1";
    if(!isNew){
      var adminsLeft=DB.users.filter(function(u){return u.role==="admin"&&u.active!==false&&u.id!==rec.id;}).length;
      if(rec.role==="admin"&&(role!=="admin"||!active)&&adminsLeft===0) return formError(t("cannotDelLastAdmin"));
      if(loggedUser()&&rec.id===loggedUser().id&&!active) return formError(t("cannotDeactivateSelf"));
    }
    var data={name:name,username:username,role:role,active:active,phone:document.getElementById("us_phone").value.trim(),email:document.getElementById("us_email").value.trim()};
    if(pass){ data.passwordHash=hashPw(pass);
      /* A password set by the admin is temporary: the account owner must
         replace it with their own at first sign-in — unless the admin is
         setting their OWN password while signed in as themselves. */
      data.mustChange = !(loggedUser() && !isNew && rec.id===loggedUser().id);
    }
    if(isNew){ data.id=uid("u"); DB.users.push(data); logAct("create","User: "+name+" ("+role+", @"+username+")"); }
    else { Object.assign(rec,data); logAct("edit","User: "+name+" ("+role+", @"+username+")"); }
    save(); closeModal(); toast(t("userSaved")); render();
  });
}
function toggleUserActive(id){
  var u=DB.users.find(function(x){return x.id===id;}); if(!u) return;
  if(loggedUser()&&u.id===loggedUser().id&&u.active!==false){ toast(t("cannotDeactivateSelf")); return; }
  if(u.role==="admin"&&u.active!==false){
    var others=DB.users.filter(function(x){return x.role==="admin"&&x.active!==false&&x.id!==id;}).length;
    if(others===0){ toast(t("cannotDelLastAdmin")); return; }
  }
  u.active=u.active===false?true:false;
  logAct("edit","User "+(u.active?"activated: ":"deactivated: ")+u.name);
  save(); toast(t("userSaved")); render();
}
function deleteUser(id){
  var u=DB.users.find(function(x){return x.id===id;}); if(!u) return;
  if(loggedUser()&&u.id===loggedUser().id){ toast(t("cannotDelSelf")); return; }
  if(u.role==="admin"){
    var others=DB.users.filter(function(x){return x.role==="admin"&&x.id!==id;}).length;
    if(others===0){ toast(t("cannotDelLastAdmin")); return; }
  }
  confirmModal(t("confirmDeleteUser")+" — "+u.name, t("delete"), function(){
    DB.users=DB.users.filter(function(x){return x.id!==id;});
    logAct("delete","User: "+u.name);
    save(); toast(t("userDeleted")); render();
  });
}
function vSettings(){
  var s=DB.settings;
  var h='<h1>'+esc(t("settingsTitle"))+'</h1>';
  h+='<div class="grid2"><div>'+fld(t("commissionPct"),inp("set_comm",s.commissionPct,"number",'step="0.1" min="0"'))+'</div></div>'
    +'<label style="display:flex;gap:10px;align-items:flex-start;margin:14px 0;cursor:pointer;min-height:2.25rem"><input type="checkbox" id="set_neg" style="width:20px;height:20px;margin-top:2px"'+(s.allowNegative?" checked":"")+'><span><strong>'+esc(t("allowNegative"))+'</strong><br><small style="color:var(--muted)">'+esc(t("allowNegativeHelp"))+'</small></span></label>'
    +'<button class="btn" data-act="settings-save">'+esc(t("save"))+'</button>';
  h+='<h2>'+esc(t("backup"))+'</h2><div class="rowflex"><button class="btn secondary" data-act="backup-export">'+esc(t("exportBackup"))+'</button>'
    +'<label class="btn secondary" style="display:inline-flex;align-items:center;cursor:pointer">'+esc(t("importBackup"))+'<input type="file" id="importFile" accept=".json,application/json" style="display:none"></label></div>'
    +'<div class="sub" style="margin-top:8px">'+esc(t("importWarn"))+'</div>';
  h+='<h2>'+esc(t("demo"))+'</h2><div class="sub">'+esc(t("demoNote"))+'</div><div class="rowflex">'
    +'<button class="btn secondary" data-act="demo-load">'+esc(t("loadDemo"))+'</button>'
    +'<button class="btn secondary" data-act="demo-clear">'+esc(t("clearDemo"))+'</button></div>';
  h+='<h2 style="color:var(--bad)">'+esc(t("dangerZone"))+'</h2><div class="sub">'+esc(t("clearAllWarn"))+'</div>'
    +'<button class="btn danger" data-act="clear-all">'+esc(t("clearAll"))+'</button>';
  return h;
}

/* ---------------- CSV exports per module ---------------- */
function moduleCsv(mod){
  var head,rows=[];
  if(mod==="products"){ head=["Name","Category","Brand","Model","Purchase cost","Selling price","Quantity","Min stock","Supplier","Notes"];
    DB.products.forEach(function(p){ var s=supplierById(p.supplierId); rows.push([p.name,p.category||"",p.brand||"",p.model||"",p.cost,p.price,p.qty,p.minStock,s?s.name:"",p.notes||""]); }); }
  else if(mod==="stock"){ head=["Product","Quantity","Min stock","Unit cost","Stock value"];
    DB.products.forEach(function(p){ rows.push([p.name,p.qty,p.minStock,p.cost,(num(p.qty)*num(p.cost)).toFixed(2)]); }); }
  else if(mod==="sales"||mod==="purchases"){
    var list=mod==="sales"?DB.salesInvoices:DB.purchaseInvoices; head=["Number","Date","Party","Employee","Total","Discount","Paid","Remaining","Status"];
    list.forEach(function(inv){ var paid=invoicePaid(inv); var party=mod==="sales"?customerById(inv.customerId):supplierById(inv.supplierId);
      rows.push([inv.number,inv.date,party?party.name:inv.partyName||"",userName(inv.employeeId),inv.total,inv.discount,paid.toFixed(2),(num(inv.total)-paid).toFixed(2),invStatus(inv)]); }); }
  else if(mod==="customers"){ head=["Name","Phone","WhatsApp","Email","Address","Notes","Balance"];
    DB.customers.forEach(function(c){ rows.push([c.name,c.phone||"",c.whatsapp||"",c.email||"",c.address||"",c.notes||"",customerBalance(c.id).toFixed(2)]); }); }
  else if(mod==="suppliers"){ head=["Name","Phone","Email","Address","Balance owed"];
    DB.suppliers.forEach(function(s){ rows.push([s.name,s.phone||"",s.email||"",s.address||"",supplierBalance(s.id).toFixed(2)]); }); }
  else if(mod==="payments"){ head=["Date","Direction","Party","Amount","Method","Invoice","Note","Recorded by","Voided"];
    DB.payments.forEach(function(p){ rows.push([p.date,p.dir==="in"?"In":"Out",p.partyName||"",p.amount,p.method,p.invoiceNumber||p.note||"",p.note||"",payRecorder(p),p.voided?"Yes":"No"]); }); }
  else if(mod==="expenses"){ head=["Date","Title","Category","Amount","Method","Notes"];
    DB.expenses.forEach(function(e){ rows.push([e.date,e.title,e.category||"",e.amount,e.method,e.notes||""]); }); }
  else if(mod==="commissions"){ head=["Date","Invoice","Employee","Rate %","Amount","Paid"];
    DB.commissions.forEach(function(c){ rows.push([c.date,c.invoiceNumber||"",userName(c.employeeId),c.rate,c.amount,c.paid?"Yes":"No"]); }); }
  else if(mod==="leads"){ head=["Name","Company","Phone","Email","Source","Stage","Value","Next follow-up","Lost reason","Employee"];
    DB.leads.forEach(function(l){ rows.push([l.name,l.company||"",l.phone||"",l.email||"",l.source||"",l.stage,l.value||0,l.nextFollow||"",l.lostReason||"",userName(l.employeeId)]); }); }
  else if(mod==="quotations"){ head=["Number","Date","For","Total","Discount","Status","Valid until"];
    DB.quotations.forEach(function(q){ rows.push([q.number,q.date,q.partyName||"",q.total,q.discount,q.status,q.validUntil||""]); }); }
  else if(mod==="activity"){ head=["When","User","Action","Detail"];
    DB.activity.forEach(function(a){ rows.push([a.ts,a.user,a.action,a.detail]); }); }
  else return;
  exportCsv("epsilon-"+mod+"-"+todayStr(), [head].concat(rows));
}

/* ---------------- Demo data ---------------- */
function loadDemo(){
  if(DB.products.some(function(p){return p.demo;})){ toast(t("demoLoaded")); return; }
  var d=todayStr();
  var sup1={id:uid("s"),name:"DEMO Nile Trading",phone:"01000000001",email:"",address:"Cairo",openingBalance:0,notes:"",demo:true};
  var sup2={id:uid("s"),name:"DEMO Delta Supplies",phone:"01000000002",email:"",address:"Giza",openingBalance:0,notes:"",demo:true};
  DB.suppliers.push(sup1,sup2);
  var prods=[
    {name:"DEMO Motor 5.5kW",cost:8200,price:11500,qty:14,category:"Motors",brand:"Siemens",model:"1LE1",minStock:3,supplierId:sup1.id},
    {name:"DEMO Water Pump 2in",cost:3400,price:4950,qty:22,category:"Pumps",brand:"Pedrollo",model:"PKm65",minStock:5,supplierId:sup1.id},
    {name:"DEMO Cable 3x2.5mm 100m",cost:1900,price:2650,qty:40,category:"Cables",brand:"Elsewedy",model:"CU/PVC",minStock:10,supplierId:sup2.id},
    {name:"DEMO Control Panel 11kW",cost:12500,price:17800,qty:4,category:"Control Panels",brand:"Schneider",model:"ATS48",minStock:2,supplierId:sup2.id},
    {name:"DEMO Generator 20kVA",cost:96000,price:128000,qty:2,category:"Generators",brand:"Perkins",model:"404D",minStock:1,supplierId:sup1.id}
  ].map(function(x){ x.id=uid("p"); x.notes=""; x.demo=true; x.priceHistory=[]; return x; });
  prods.forEach(function(p){ DB.products.push(p); DB.movements.unshift({id:uid("m"),date:d,productId:p.id,productName:p.name,change:p.qty,after:p.qty,type:"opening",ref:"DEMO",by:me().name}); });
  var cust={id:uid("c"),name:"DEMO Alpha Factory",phone:"01200000001",whatsapp:"01200000001",email:"",address:"10th of Ramadan City",openingBalance:0,notes:"",demo:true};
  DB.customers.push(cust);
  var pinv={id:uid("pi"),number:"PUR-"+(DB.counters.purchase++),date:d,supplierId:sup1.id,partyName:sup1.name,employeeId:"u1",demo:true,
    items:[{productId:prods[1].id,name:prods[1].name,qty:5,price:3400,cost:3400}],discount:0,total:17000,status:"active"};
  DB.purchaseInvoices.unshift(pinv);
  DB.payments.unshift({id:uid("pay"),date:d,dir:"out",partyId:sup1.id,partyName:sup1.name,amount:5000,method:"bank",invoiceId:pinv.id,invoiceNumber:pinv.number,note:"",demo:true,createdById:me().id,createdByName:me().name});
  var sinv={id:uid("si"),number:"INV-"+(DB.counters.sales++),date:d,customerId:cust.id,partyName:cust.name,employeeId:"u2",demo:true,
    items:[{productId:prods[0].id,name:prods[0].name,qty:2,price:11500,cost:8200},{productId:prods[2].id,name:prods[2].name,qty:3,price:2650,cost:1900}],
    discount:950,total:2*11500+3*2650-950,status:"active"};
  DB.salesInvoices.unshift(sinv);
  prods[0].qty-=2; prods[2].qty-=3;
  DB.movements.unshift({id:uid("m"),date:d,productId:prods[0].id,productName:prods[0].name,change:-2,after:prods[0].qty,type:"sale",ref:sinv.number,by:me().name});
  DB.movements.unshift({id:uid("m"),date:d,productId:prods[2].id,productName:prods[2].name,change:-3,after:prods[2].qty,type:"sale",ref:sinv.number,by:me().name});
  DB.payments.unshift({id:uid("pay"),date:d,dir:"in",partyId:cust.id,partyName:cust.name,amount:20000,method:"cash",invoiceId:sinv.id,invoiceNumber:sinv.number,note:"",demo:true,createdById:me().id,createdByName:me().name});
  DB.commissions.unshift({id:uid("cm"),date:d,invoiceId:sinv.id,invoiceNumber:sinv.number,employeeId:"u2",amount:sinv.total*num(DB.settings.commissionPct)/100,rate:num(DB.settings.commissionPct),paid:false,demo:true});
  DB.expenses.unshift({id:uid("ex"),date:d,title:"DEMO Office rent",category:"Rent",amount:6000,method:"bank",notes:"",demo:true});
  var lead1={id:uid("ld"),name:"DEMO Eng. Karim Adel",company:"DEMO Beta Contracting",phone:"01100000003",email:"",source:"Referral",value:45000,stage:"Negotiation",nextFollow:d,notes:"",employeeId:"u2",followLog:[],demo:true};
  var lead2={id:uid("ld"),name:"DEMO Sara Mahmoud",company:"DEMO Nile Foods",phone:"01100000004",email:"",source:"Website",value:18000,stage:"New Lead",nextFollow:d,notes:"",employeeId:"u3",followLog:[],demo:true};
  DB.leads.unshift(lead1,lead2);
  DB.quotations.unshift({id:uid("q"),number:"QT-"+(DB.counters.quote++),date:d,partyName:lead1.company,leadId:lead1.id,customerId:null,
    items:[{productId:prods[3].id,name:prods[3].name,qty:1,price:17800,cost:12500}],discount:800,total:17000,status:"Sent",validUntil:"",notes:"",employeeId:"u2",demo:true});
  logAct("create","Demo data loaded");
  save(); toast(t("demoLoaded")); render();
}
function clearDemo(){
  confirmModal(t("confirmDemoClear"), t("clearDemo"), function(){
    var demoProdIds={}; DB.products.forEach(function(p){ if(p.demo) demoProdIds[p.id]=1; });
    DB.products=DB.products.filter(function(p){return !p.demo;});
    DB.customers=DB.customers.filter(function(c){return !c.demo;});
    DB.suppliers=DB.suppliers.filter(function(s){return !s.demo;});
    DB.salesInvoices=DB.salesInvoices.filter(function(i){return !i.demo;});
    DB.purchaseInvoices=DB.purchaseInvoices.filter(function(i){return !i.demo;});
    DB.payments=DB.payments.filter(function(p){return !p.demo;});
    DB.expenses=DB.expenses.filter(function(e){return !e.demo;});
    DB.commissions=DB.commissions.filter(function(c){return !c.demo;});
    DB.leads=DB.leads.filter(function(l){return !l.demo;});
    DB.quotations=DB.quotations.filter(function(q){return !q.demo;});
    DB.movements=DB.movements.filter(function(m){return !demoProdIds[m.productId];});
    logAct("delete","Demo data cleared");
    save(); toast(t("demoCleared")); render();
  });
}

/* ---------------- Global events ---------------- */
document.addEventListener("click",function(e){
  var nav=e.target.closest("[data-go]");
  if(nav){ go(nav.getAttribute("data-go")); return; }
  if(e.target.closest("[data-close]")){ closeModal(); return; }
  var b=e.target.closest("[data-act]"); if(!b) return;
  var act=b.getAttribute("data-act"), id=b.getAttribute("data-id");
  try{
    if(act==="product-new") productForm(null);
    else if(act==="product-edit") productForm(productById(id));
    else if(act==="product-hist"){ ui.histProduct=ui.histProduct===id?null:id; render(); }
    else if(act==="product-del"){ var p=productById(id); confirmModal(t("confirmDelete")+" — "+(p?p.name:""), t("delete"), function(){ DB.products=DB.products.filter(function(x){return x.id!==id;}); logAct("delete","Product: "+(p?p.name:id)); save(); toast(t("deletedOk")); render(); }); }
    else if(act==="product-adjust"){ adjustForm(id); }
    else if(act==="sales-new") invoiceForm("sales",null);
    else if(act==="purchase-new") invoiceForm("purchase",null);
    else if(act==="inv-print") printInvoice(b.getAttribute("data-kind"), id);
    else if(act==="inv-cancel") cancelInvoice(b.getAttribute("data-kind"), id);
    else if(act==="inv-pay"){ var kind=b.getAttribute("data-kind"); var inv=(kind==="sales"?DB.salesInvoices:DB.purchaseInvoices).find(function(x){return x.id===id;});
      paymentForm({dir:kind==="sales"?"in":"out", partyId:kind==="sales"?inv.customerId:inv.supplierId, invoiceId:id}); }
    else if(act==="customer-new") partyForm("customer",null);
    else if(act==="supplier-new") partyForm("supplier",null);
    else if(act==="customer-edit") partyForm("customer",customerById(id));
    else if(act==="supplier-edit") partyForm("supplier",supplierById(id));
    else if(act==="customer-stmt"){ ui.stmtCustomer=ui.stmtCustomer===id?null:id; render(); }
    else if(act==="supplier-stmt"){ ui.stmtSupplier=ui.stmtSupplier===id?null:id; render(); }
    else if(act==="customer-del"){ var c=customerById(id); confirmModal(t("confirmDelete")+" — "+(c?c.name:""), t("delete"), function(){ DB.customers=DB.customers.filter(function(x){return x.id!==id;}); logAct("delete","Customer: "+(c?c.name:id)); save(); toast(t("deletedOk")); render(); }); }
    else if(act==="supplier-del"){ var s2=supplierById(id); confirmModal(t("confirmDelete")+" — "+(s2?s2.name:""), t("delete"), function(){ DB.suppliers=DB.suppliers.filter(function(x){return x.id!==id;}); logAct("delete","Supplier: "+(s2?s2.name:id)); save(); toast(t("deletedOk")); render(); }); }
    else if(act==="payment-new") paymentForm(null);
    else if(act==="party-pay"){ var pk=b.getAttribute("data-kind"); paymentForm({dir:pk==="customer"?"in":"out", partyId:id}); }
    else if(act==="fin-reset"){ ui.finFrom=""; ui.finTo=""; render(); }
    else if(act==="expense-new") expenseForm(null);
    else if(act==="expense-edit") expenseForm(DB.expenses.find(function(x){return x.id===id;}));
    else if(act==="expense-del"){ var ex=DB.expenses.find(function(x){return x.id===id;}); confirmModal(t("confirmDelete")+" — "+(ex?ex.title:""), t("delete"), function(){ DB.expenses=DB.expenses.filter(function(x){return x.id!==id;}); logAct("delete","Expense: "+(ex?ex.title:id)); save(); toast(t("deletedOk")); render(); }); }
    else if(act==="comm-toggle"){ var cm=DB.commissions.find(function(x){return x.id===id;}); if(cm){ cm.paid=!cm.paid; logAct("edit","Commission "+cm.invoiceNumber+" → "+(cm.paid?"paid":"unpaid")); save(); render(); } }
    else if(act==="comm-rate-save"){ var nr=Math.max(0,num(document.getElementById("commRateInput").value)); DB.settings.commissionPct=nr; logAct("edit","Default commission rate → "+nr+"%"); save(); toast(t("settingsSaved")); render(); }
    else if(act==="comm-rate-one"){ var cm2=DB.commissions.find(function(x){return x.id===id;}); var inp2=document.querySelector('[data-rate-for="'+id+'"]');
      if(cm2&&inp2){ var nr2=Math.max(0,num(inp2.value)); var inv2=DB.salesInvoices.find(function(x){return x.id===cm2.invoiceId;});
        if(inv2) cm2.amount=num(inv2.total)*nr2/100; else if(num(cm2.rate)>0) cm2.amount=num(cm2.amount)*nr2/num(cm2.rate);
        cm2.rate=nr2; logAct("edit","Commission rate "+cm2.invoiceNumber+" → "+nr2+"%"); save(); toast(t("savedOk")); render(); } }
    else if(act==="lead-new") leadForm(null);
    else if(act==="lead-edit") leadForm(DB.leads.find(function(x){return x.id===id;}));
    else if(act==="lead-del"){ var ld=DB.leads.find(function(x){return x.id===id;}); confirmModal(t("confirmDelete")+" — "+(ld?ld.name:""), t("delete"), function(){ DB.leads=DB.leads.filter(function(x){return x.id!==id;}); logAct("delete","Lead: "+(ld?ld.name:id)); save(); toast(t("deletedOk")); render(); }); }
    else if(act==="lead-move") moveLead(id, num(b.getAttribute("data-dir")));
    else if(act==="lead-won") leadWon(id);
    else if(act==="lead-lost") leadLost(id);
    else if(act==="lead-follow") followForm(id);
    else if(act==="lead-view"){ ui.leadView=b.getAttribute("data-v"); render(); }
    else if(act==="lead-quote"){ var lq=DB.leads.find(function(x){return x.id===id;}); quoteForm(lq); }
    else if(act==="quote-new") quoteForm(null);
    else if(act==="quote-print") printQuote(id);
    else if(act==="quote-convert") convertQuote(id);
    else if(act==="quote-del"){ var qq=DB.quotations.find(function(x){return x.id===id;}); confirmModal(t("confirmDelete")+" — "+(qq?qq.number:""), t("delete"), function(){ DB.quotations=DB.quotations.filter(function(x){return x.id!==id;}); logAct("delete","Quotation: "+(qq?qq.number:id)); save(); toast(t("deletedOk")); render(); }); }
    else if(act==="rep-run"){ ui.repType=document.getElementById("repType").value; ui.repFrom=document.getElementById("repFrom").value; ui.repTo=document.getElementById("repTo").value; render(); }
    else if(act==="rep-csv"){ var d=reportData(); exportCsv("epsilon-report-"+ui.repType+"-"+todayStr(), [d.head].concat(d.rows)); }
    else if(act==="csv") moduleCsv(b.getAttribute("data-mod"));
    else if(act==="user-new") userForm(null);
    else if(act==="user-edit") userForm(DB.users.find(function(x){return x.id===id;}));
    else if(act==="user-toggle") toggleUserActive(id);
    else if(act==="user-del") deleteUser(id);
    else if(act==="settings-save"){
      DB.settings.commissionPct=Math.max(0,num(document.getElementById("set_comm").value));
      DB.settings.allowNegative=document.getElementById("set_neg").checked;
      logAct("edit","Settings updated"); save(); toast(t("settingsSaved")); render();
    }
    else if(act==="backup-export"){ download("epsilon-backup-"+todayStr()+".json", JSON.stringify(DB,null,2), "application/json"); logAct("export","Backup exported"); save(); toast(t("backupDone")); }
    else if(act==="demo-load") loadDemo();
    else if(act==="demo-clear") clearDemo();
    else if(act==="clear-all"){
      openModal(t("clearAll"), '<p>'+esc(t("clearAllWarn"))+'</p>'+fld(t("confirmClearAll"),inp("wipe_text","")),
        '<button type="button" class="btn danger" id="wipeGo">'+esc(t("clearAll"))+'</button>');
      document.getElementById("wipeGo").addEventListener("click",function(){
        if(document.getElementById("wipe_text").value.trim()!=="DELETE") return formError(t("confirmClearAll"));
        var keep={lang:DB.settings.lang,userId:DB.settings.userId,commissionPct:DB.settings.commissionPct,allowNegative:DB.settings.allowNegative};
        var users=DB.users; DB=blankState(); DB.users=users; DB.settings=keep;
        logAct("delete","ALL data erased"); save(); closeModal(); toast(t("allCleared")); go("dashboard");
      });
    }
  }catch(err){ toast(t("errGeneric")); }
});
function adjustForm(id){
  var p=productById(id); if(!p) return;
  var body='<p><strong>'+esc(p.name)+'</strong> — '+esc(t("stock"))+': '+fmtN(p.qty)+'</p>'
    +fld(t("newQty")+" *",inp("adj_qty",p.qty,"number",'step="0.01"'))
    +fld(t("reason"),inp("adj_reason",""));
  openModal(t("adjustStock"), body, '<button type="button" class="btn" id="adjSave">'+esc(t("save"))+'</button>');
  document.getElementById("adjSave").addEventListener("click",function(){
    var nq=num(document.getElementById("adj_qty").value); var diff=nq-num(p.qty);
    if(diff!==0){ moveStock(id,diff,"adjustment",document.getElementById("adj_reason").value.trim()); logAct("edit","Stock adjustment: "+p.name+" → "+fmtN(nq)); }
    save(); closeModal(); toast(t("adjustDone")); render();
  });
}
document.addEventListener("change",function(e){
  if(e.target.id==="importFile"){
    var f=e.target.files[0]; if(!f) return;
    var rd=new FileReader();
    rd.onload=function(){
      try{ var data=JSON.parse(rd.result);
        if(!data||data.v!==1||!data.users||!data.products) throw new Error("bad");
        DB=data; logAct("import","Backup imported"); save(); toast(t("importDone")); go("dashboard");
      }catch(err){ toast(t("importBad")); }
    };
    rd.readAsText(f);
  }
  if(e.target.hasAttribute("data-quote-status")){
    var q=DB.quotations.find(function(x){return x.id===e.target.getAttribute("data-quote-status");});
    if(q){ q.status=e.target.value; logAct("edit","Quotation "+q.number+" → "+q.status); save(); toast(t("savedOk")); render(); }
  }
});
function liveSearch(e, field, inputId){
  ui[field]=e.target.value;
  var pos=e.target.selectionStart; render();
  var el=document.getElementById(inputId); if(el){ el.focus(); try{ el.setSelectionRange(pos,pos); }catch(x){} }
}
document.addEventListener("input",function(e){
  if(e.target.id==="prodSearch") liveSearch(e,"search","prodSearch");
  else if(e.target.id==="invSearch") liveSearch(e,"invSearch","invSearch");
  else if(e.target.id==="paySearch") liveSearch(e,"paySearch","paySearch");
  else if(e.target.id==="commSearch") liveSearch(e,"commSearch","commSearch");
  else if(e.target.id==="commProdSearch") liveSearch(e,"commProdSearch","commProdSearch");
  else if(e.target.id==="accSearch") liveSearch(e,"accSearch","accSearch");
  else if(e.target.id==="custSearch") liveSearch(e,"custSearch","custSearch");
  else if(e.target.id==="suppSearch") liveSearch(e,"suppSearch","suppSearch");
  else if(e.target.id==="salesSearch") liveSearch(e,"salesSearch","salesSearch");
});
document.addEventListener("change",function(e){
  if(e.target.id==="lowSel"){ ui.lowOnly=e.target.value==="1"; render(); }
  if(e.target.id==="invLowSel"){ ui.invLowOnly=e.target.value==="1"; render(); }
  if(e.target.id==="accMethodSel"){ ui.accMethod=e.target.value; render(); }
  if(e.target.id==="payDirSel"){ ui.payDir=e.target.value; render(); }
  if(e.target.id==="payFrom"){ ui.payFrom=e.target.value; render(); }
  if(e.target.id==="payTo"){ ui.payTo=e.target.value; render(); }
  if(e.target.id==="finFrom"){ ui.finFrom=e.target.value; render(); }
  if(e.target.id==="finTo"){ ui.finTo=e.target.value; render(); }
});
function toggleLang(){
  DB.settings.lang = lang()==="en" ? "ar" : "en";
  if(loggedUser()) logAct("switch","Language: "+DB.settings.lang);
  save(); render();
  if(loggedUser()) toast(t("langSaved"));
}
document.getElementById("langBtn").addEventListener("click",toggleLang);
document.getElementById("loginLangBtn").addEventListener("click",toggleLang);
document.getElementById("logoutBtn").addEventListener("click",function(){ doLogout(); });
document.getElementById("loginForm").addEventListener("submit",function(e){ e.preventDefault(); doLogin(); });
document.getElementById("setupForm").addEventListener("submit",function(e){ e.preventDefault(); doSetup(); });
document.getElementById("changeForm").addEventListener("submit",function(e){ e.preventDefault(); doChangePassword(); });
document.getElementById("menuBtn").addEventListener("click",function(){
  document.getElementById("sideNav").classList.toggle("open");
});

/* ---------------- Init ---------------- */
load();
/* If a previous sign-in session exists on this browser, restore it as the working user. */
(function(){ var u=loggedUser(); if(u) DB.settings.userId=u.id; })();
render();
