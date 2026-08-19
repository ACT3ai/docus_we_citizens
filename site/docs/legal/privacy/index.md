---
id: privacy
title: Privacy Policy
sidebar_label: Privacy Policy
sidebar_position: 2
slug: /legal/privacy
description: The Privacy Policy for We The Citizens, the website at wethecitizens.io, and the app at app.WeTheCitizens.io.
format: md
---

# We The Citizens — Privacy Policy

**Version 0.2 — UNPUBLISHED DRAFT.**
**Draft date: 2026-08-19.** The effective date becomes the date of publication.

> **WHAT CHANGED IN 0.2 — THE AI-TRAINING REVERSAL (2026-08-19).** Bryan confirmed that **we do
> train our own AI models on citizen data, and that data is also used to train AI outside our
> company.** Version 0.1 said the opposite. **§11.6 is rewritten** as the training disclosure and
> the statement now also appears in the summary on the first screen; **§6.1** now requires **three
> separate Article 9 consents** — to record, to train, and to train outside the company; **§11.7**
> makes training the third one-way door; **§8.1's** flat "we do not sell" claim is **suspended
> pending counsel**, because providing data to an outside party for AI training may be a "sale" or
> "share" under CCPA/CPRA; **§13.5** turns GPC into a live opt-out; and **§17.3** adds trained
> models to what deletion cannot reach. **Appendix C.0 is new and is now the highest-risk group in
> the document.**
**Controller: \{LEGAL_ENTITY\}.** Privacy contact: **\{PRIVACY_CONTACT\}**.
Change log: [Version history](#23-changes-to-this-policy).

> **THIS IS A DRAFT AND IT IS NOT LEGAL ADVICE.** It has not been reviewed by a lawyer, and
> several statements in it have not yet been verified against a deployed product. The items
> that must be closed before this may be published are listed in **Appendix C — Unverified
> Facts**. Do not publish this document until that appendix is empty.

---

## The Short Version

*This is a summary. It is not the policy. Everything below it controls, and where the two
differ the detail below wins. Nothing in this summary is true in a way the body contradicts —
if you find a place where it is, that is a defect and we want to hear about it.*

**Your political positions stay on your own computer.** We The Citizens is a local-first
application. Your positions, values, evidence, and reasoning are flat files on your machine.
We do not receive them, we cannot read them, we cannot restore them, and **we cannot produce
them to a government, because we never had them.**

**Recording your political opinions is what this product is for.** That makes them *special
category data* under Article 9 of the GDPR and the UK GDPR — the most protected class of
personal data there is. We treat political opinion as sensitive **everywhere in the world, by
our own choice**, and not because every jurisdiction makes us.

**WE USE YOUR DATA TO TRAIN AI — ours, and other companies'.** This is the most consequential
thing on this page and we are not going to put it on page nine. Content that reaches us is used
to **train our own AI models**, and it is **also used to train AI outside our company**. Training
is **irreversible**: withdrawing consent stops future training, but nothing can be removed from a
model already trained on it. **Data that stays on your own machine is never trained on by anyone,
because we never receive it** — that is the one part of this product where training is impossible
by construction, and it is now the most important sentence in this policy. §11.

**We do not share anything with campaigns, parties, political committees, PACs, or political data
brokers.** That promise is unaffected by the paragraph above and it is absolute. **We do not sell
your data as a mailing list to anyone.** *(Whether providing data to an outside party for AI
training is legally a "sale" or "share" under California law is a question we have put to counsel
and have not yet answered — so we are not making a flat "we never sell" claim on this page. §8.1.)*

**We show no advertising and run no analytics.** As of **2026-08-19**, an audit of every file
in the application source found **no analytics service, no advertising pixel, no crash-reporting
service, no session replay, no update check, and no telemetry of any kind.** The only network
address the application contacts is your own machine.

**AI is off unless you turn it on.** The reasoning feature runs a local, offline, deterministic
engine by default. It contacts an outside AI provider **only** if whoever installed the
application supplied an API key. When it does, your position text is what gets sent. §11 says
exactly what happens to it.

**When you ask a government question, here is what a government can get.** Almost nothing — see
§9. What we hold about a hosted account is an email address, a display name, a profile picture,
and a session record. Your positions are not in that list, and no legal process can make them
appear in it.

**What you publish, you cannot fully un-publish.** Publishing to a federated network sends
copies to computers we do not run. We can delete our copy and ask others to delete theirs. **We
cannot promise it is gone.** §10.

**Getting your data out is easy, because most of it was never in.** Your files are already on
your disk, in a readable format, and you can delete them yourself without asking us. §17, §18.

---

## Table of Contents

1. [The Short Version](#the-short-version) · 2. [Who We Are and What This Policy Covers](#2-who-we-are-and-what-this-policy-covers) ·
3. [The Local-First Split](#3-the-local-first-split--what-never-reaches-us) · 4. [The Data Map](#4-the-data-map) ·
5. [How We Use Data](#5-how-we-use-data) · 6. [Legal Bases](#6-legal-bases-for-processing) ·
7. [Political Opinions as Sensitive Data](#7-political-opinions-as-sensitive-data) · 8. [Sharing and Disclosure](#8-sharing-and-disclosure) ·
9. [Law Enforcement and Government Requests](#9-law-enforcement-government-requests-and-transparency) ·
10. [Federation and Irreversibility](#10-federation-and-irreversibility) · 11. [AI Processing](#11-ai-processing) ·
12. [Payments](#12-payments) · 13. [Cookies, Tracking, and Analytics](#13-cookies-tracking-and-analytics) ·
14. [Children](#14-children) · 15. [Security](#15-security) · 16. [WeTheCitizens.tv and the VPPA](#16-wethecitizenstv-and-the-video-privacy-protection-act) ·
17. [Retention and Deletion](#17-retention-and-deletion) · 18. [Your Rights](#18-your-rights) ·
19. [International Transfers](#19-international-transfers-and-regional-terms) · 20. [Communications](#20-communications-and-marketing) ·
21. [Community Mode and Publishing](#21-community-mode-and-publishing) · 22. [Governance and Accountability](#22-governance-and-accountability) ·
23. [Changes to This Policy](#23-changes-to-this-policy) · 24. [Contact](#24-contact)

*Appendices A–E follow the policy and are **not part of it**.*

---

## 2. Who We Are and What This Policy Covers

**2.1 The controller.** \{LEGAL_ENTITY\} is the controller of the personal data described in this
policy. *(Open item — see Appendix A.)*

**2.2 What this policy covers.** WeTheCitizens.io, the local application you run on your own
computer, and — **when they exist** — WeCitizens.social and WeTheCitizens.tv.

**2.3 WHAT EXISTS TODAY, STATED PLAINLY.** This policy describes a product that is still being
built, and we would rather say so than describe surfaces we do not operate. As of the draft date
of this document, **the following are not built and we operate none of them: payments and
subscriptions, WeTheCitizens.tv and any video service, publishing to a federated network, and
host-based party front doors.** Sections 12, 16, 10 and 7.4 describe how each will work and are
written now so that the disclosure exists *before* the feature does. **We will update this policy
and give notice before any of them launches.** Where a section describes something not yet built,
it says so in its first line.

**2.4 What this policy does NOT cover — other people's instances.** We The Citizens is open
source. **Anyone can run their own copy, and many people do.** If you are using an instance
someone else runs, **they are the controller of your data, not us, and this policy does not
apply to you.** Their practices are theirs. If you are not certain whose instance you are on,
assume it is not ours and ask them.

**2.5 Also not covered.** Third-party services you connect, relays and media servers operated by
others, other federated instances, and your identity provider's own handling of your account.

**2.6 One policy, all front doors.** If and when WeTheCitizens.io, WeCitizensR.com,
WeCitizensD.com, WeCitizensL.com and WeCitizensSocialism.com operate as different front pages of
one application, **they are one product under one policy with identical data handling**. A
different door is a different page, never different treatment. See §7.4.

**2.7 The local-client notice.** For the application on your own machine, the honest answer to
most questions in this policy is *"this never reaches us."* §3 is that notice, and it is the
section to read first if you never create an account.

**2.8 Processing on our own behalf, and on someone else's.** Where we process data for our own
purposes we are the controller and this policy governs. Where we process data **on behalf of** a
community steward, they are the controller and their notice governs, not this one. §21.

**2.9 Contacting us about privacy.** \{PRIVACY_CONTACT\}. §24.

---

## 3. The Local-First Split — What Never Reaches Us

**3.1 Where your positions live.** Your positions, values, evidence, reasoning chains, drafts,
generated laws, and private notes are **flat files in a directory on your own computer**. They
are created there, edited there, and stay there. **There is no central server you must trust in
order to use this product.** The application is complete without an account and without us.

**3.2 We do not have the technical means to read them.** This is not a policy choice we could
quietly reverse in a revision. The application does not transmit those files, and **we operate no
system that receives them.** We cannot read them, search them, back them up, restore them,
analyse them, or produce them to anyone.

**3.3 What we will never say, and why we are saying that too.** We will not tell you "we never
collect your data" or "we cannot see anything," because **both would be false** the moment you
create an account, contact support, publish something, or use an AI feature. The precise claim is
the one in §3.1 and §3.2, and it is bounded by §3.4.

**3.4 THE CROSSOVER MOMENTS — every point where data leaves your machine, named individually.**

| # | Moment | What leaves | Where it goes |
| --- | --- | --- | --- |
| 1 | **You sign in** | your email, name and profile picture from your identity provider | our hosted service, and your identity provider |
| 2 | **You use an AI feature** *(only if an API key is configured — §11)* | the text of the position or reasoning being checked | the AI provider |
| 3 | **You contact support** | whatever you write to us | our hosted service |
| 4 | **You publish** *(not yet built — §10)* | what you chose to publish | our hosted service, then the federated network |
| 5 | **You join a community** *(§21)* | your membership and what you contribute to it | our hosted service and the community steward |
| 6 | **You pay us** *(not yet built — §12)* | billing details | the payment processor |

**If you do none of these six things, nothing about you reaches us at all.** That is not a
marketing sentence; it is a description of the architecture, and §3.5 is the evidence for it.

**3.5 THE APPLICATION DOES NOT PHONE HOME. Audited 2026-08-19.** We examined every one of the
137 source files in the application and extracted every outbound address and every network call.
**The complete set of non-local addresses in the source code is one, and it is a comment in a
code-generation file.** Every network call the application makes goes to `/api` — the backend
running on **your own computer**.

Specifically, and each of these is a thing many applications do and this one does not:

* **No analytics.** No analytics product of any kind is present. *(§13)*
* **No crash-reporting or error-tracking service.** Nothing is sent to a third party when the
  application fails. *(§3.6)*
* **No update check, no version ping, no feature-flag service, no licence check.**
* **No advertising or social pixel, no session replay, no keystroke or mouse-movement recording.**

**This claim is dated on purpose, and it is scoped to a version.** It describes the code as
audited on the date given. We re-verify it at each release and we will say so if it ever changes
— in advance, under §23.2, not in a quietly revised policy.

**3.6 The one thing that looks like telemetry, and what it actually is.** When the application
hits an unexpected error in your browser, it sends the error message, the stack trace, and a short
context label **to the backend on your own machine**, which writes it to a log file in your state
directory. A stack trace can contain fragments of what you were working on, so we disclose it —
but understand what it is: **the application writing a file to your own disk.** Nothing is
transmitted anywhere. The file is yours; you can read it and delete it. Its size is capped (§17.6).

**3.7 What we cannot produce, and what that protects you from.** There is no backup of your local
files, no recovery, and **no possibility of production under subpoena** (§9.6). If you lose those
files, we cannot help you get them back. The same fact that makes that true is what makes §9
true. It is a limitation and a protection at once, and you should understand both halves.

**3.8 THE LAYER BENEATH US SEES THINGS WE DO NOT LOG.** If you use a hosted service of ours, your
connection passes through your internet service provider, our hosting provider, and any content
delivery network or firewall in between. **Those parties can see that a connection happened,
from what network address, and to which hostname — including which front door you used — even
where our own application never records it.** We cannot prevent that; it is how the internet
works. A no-logging claim that ignores the layer beneath it would be false, so we are not making
one. See §7.4 and §13.

**3.9 If the boundary ever moves, you hear about it first.** If we ever change what stays local
and what reaches us, **we will tell you in advance** and, where the change affects
special-category data, we will ask for fresh consent rather than relying on notice (§23.3).

---

## 4. The Data Map

**4.1 The table.** *Verified against the application source on 2026-08-19. Rows marked
**UNVERIFIED** describe a surface that is not yet built or a fact we have not yet confirmed;
those are listed in Appendix C.*

| Category | Example fields | Where it lives | Purpose | Legal basis | Retention | Recipients |
| --- | --- | --- | --- | --- | --- | --- |
| **Positions, values, evidence, reasoning, drafts, generated laws** | your own text and YAML files | **LOCAL — your machine only** | the product itself | *no basis needed — we are not the controller of data we never receive* | **never transmitted — stays on your device**; you delete it yourself | **nobody** |
| **Your local ledger / block records** | ledger blocks, anchors | **LOCAL** | integrity of your own record | as above | **never transmitted** | **nobody** |
| **Account identity** | email address, display name, profile picture, provider subject id, role | LOCAL in individual mode; **HOSTED** if you sign in to a hosted service | to sign you in and know it is you | contract, Art. 6(1)(b) | for the life of the account, then §17 | your identity provider (Google) |
| **Session** | session identifier, session cookie, session secret | LOCAL / **HOSTED** | to keep you signed in | contract, Art. 6(1)(b) | until the session ends | nobody |
| **Application logs** | timestamps, log level, component, error messages and stack traces, the path of a failed request | **LOCAL — a file on your disk** | so the application can be fixed when it breaks | legitimate interests, Art. 6(1)(f) | **5 MB per file, 5 rotations** — then overwritten (§17.6) | **nobody** |
| **AI request and response** | the position or reasoning text you asked to be checked, and the model's answer | **PROCESSOR — the AI provider**, and only if an AI key is configured | to check your reasoning when you ask it to | **explicit consent, Art. 9(2)(a)** — consent 1 | we retain only the model name in your own record; the provider's own periods are in §11.5 | the AI provider |
| **AI TRAINING DATA — our own models** | \{TRAINING_CATEGORIES\} — see §11.6(c) | **HOSTED**, then inside a trained model | to develop, train, fine-tune and improve **our own** AI models | **explicit consent, Art. 9(2)(a)** — **consent 2**, separate | **irreversible once trained — §11.7.** Withdrawal stops future training only | us |
| **AI TRAINING DATA — outside our company** | \{TRAINING_CATEGORIES\} — see §11.6(c) | **HOSTED → THIRD PARTIES** | so parties **outside our company** can train **their** AI | **explicit consent, Art. 9(2)(a)** — **consent 3**, separate again | **irreversible once trained, and beyond our reach — §11.7** | **\{TRAINING_RECIPIENTS\}** — Appendix A |
| **Community membership and contributions** | which communities you joined, what you contributed | LOCAL / **HOSTED** | to run community mode | contract, Art. 6(1)(b), and Art. 9(2)(a) for the opinion content | for the life of the membership | the community steward, other members per §21 |
| **Support correspondence** | your email and what you wrote | **HOSTED** | to answer you | legitimate interests, Art. 6(1)(f) | **UNVERIFIED** | nobody |
| **Network address (IP)** | your IP address | **transient — never written down** | to check a request came from your own machine, and to rate-limit error reports | legitimate interests, Art. 6(1)(f) | **not stored at all** | nobody |
| **Hostname / front door** | the `Host` header | **transient — never written down** *(and no front-door feature exists yet — §7.4)* | to check a request is local | legitimate interests, Art. 6(1)(f) | **not stored at all** | nobody |
| **Published content** *(not yet built)* | whatever you publish | **HOSTED → FEDERATED** | to publish it as you asked | Art. 9(2)(e), manifestly made public | **irreversible once propagated — §10** | the network, permanently |
| **Billing** *(not yet built)* | plan, status, amounts, last four digits, brand, expiry, billing address | **HOSTED / PROCESSOR** | to charge you | contract, Art. 6(1)(b); legal obligation for tax | tax period — **UNVERIFIED** | the payment processor |
| **Viewing data** *(not yet built)* | what you watched | **UNBUILT — §16** | — | — | intended: **never transmitted** | intended: **nobody** |
| **Moderation records** *(not yet built)* | reports, enforcement actions, appeals | **HOSTED** | abuse prevention | legitimate interests, Art. 6(1)(f) | **UNVERIFIED** | nobody |

**4.2 What we deliberately do NOT collect.** Verified against the source on 2026-08-19:

* **No date of birth.** * **No biometrics** of any kind, including facial geometry — we do not
  collect, receive, possess, or have access to it. * **No precise location.** * **No advertising
  identifiers.** * **No behavioural profile.** * **No session replay, and no recording of
  scrolling, clicks, mouse movement, or keystrokes.** * **No stored IP addresses.** * **No
  purchased or enriched data about you from any third party, ever.** * **No political data
  broker file on you** — see §8.4.

Every "no" in that list was checked against what the code actually does before it was written
here, and each is re-checked before each release. **None of it is a statement about training** —
see §11.6, which says plainly that we do train on data that reaches us.

**4.3 Metadata versus content, for anything we ever hold on your behalf.** Where a hosted service
holds an item for you, it may know **that the item exists, when it was created and modified, and
how large it is**. That is different from being able to **read** it, and we state both halves
rather than only the flattering one.

**4.4 Data about people who never signed up.** Your evidence and your reasoning will name real
people — officials, politicians, public figures. **That is personal data about them**, and they
have rights in it even though they never used this product. §11.4 and §18.9 say what those
rights are and how they are exercised.

**4.5 Combination and re-identification.** If information that is not personal data on its own is
combined so that it identifies someone, **we treat the combination as personal data.** We do not
attempt to re-identify anything we have de-identified, and we do not permit anyone we share
de-identified data with to do so either (§8.7).

**4.6 A public/private list, itemised.** When publishing exists (§10), this section will carry a
binary, itemised list of exactly what publishing exposes and exactly what is never shown. **It is
not written yet because the feature is not built**, and we will not describe the behaviour of
something we have not implemented.

---

## 5. How We Use Data

**5.1** To run your account and let you sign in.
**5.2** To run the hosted service where you use one.
**5.3** To publish what you asked us to publish, when publishing exists (§10).
**5.4** To run the AI reasoning feature over the text you submit to it, when it is enabled (§11).
**5.5** To keep the service secure and prevent abuse — including detecting inauthentic accounts
and coordinated attempts to control a narrative, which the Terms of Service address at its §9.
**5.6** To answer you when you contact us.
**5.7** To meet legal obligations, including tax records and any mandatory reporting.
**5.8** To fix the product when it breaks, using the local log files described at §3.6.

**5.9 WHAT WE NEVER USE YOUR DATA FOR.** Each of these was verified against the product before it
was written:

* **We never sell it as a mailing list or a voter file**, to anyone. §8.1 states the one open
  question about the legal meaning of "sale" and does not paper over it.
* **We never target advertising at you** — we run no advertising at all. §13.4.
* **We never target anything on your political opinion**, and there is no profiling engine in
  this product.
* **We never share it with a campaign, a party, a political committee, a PAC, or a political
  data broker.** §8.4.
* *(**Training is NOT on this list.** We do train on data that reaches us, and it is also used
  to train AI outside our company. See §11.6 — we are not going to hide that inside a list of
  things we never do.)*
* **We never run behavioural analytics or session replay over your positions.** There is no
  analytics of any kind. §13.

**5.10 Product improvement.** We improve the product from the local error logs at §3.6 and from
what you tell us directly. **We run no A/B testing, no experiments, and no usage measurement**, so
there is no anonymous-analytics section here to read. If that ever changes, §23.2 applies and the
product used will be named in §13.2.

---

## 6. Legal Bases for Processing

**6.1 EXPLICIT CONSENT FOR YOUR POLITICAL OPINIONS — Article 9(2)(a).** Where we process your
political opinions — which is what happens the moment any of it reaches a hosted service or an AI
feature — we rely on **your explicit consent**.

**That consent is separate from accepting the Terms of Service. It is not bundled with signup, it
is not a pre-ticked box, and accepting the Terms does not give it.** It is asked for on its own,
in its own words, at the moment it is needed, and it names what it covers. **You can withdraw it
at any time, and withdrawing it is as easy as giving it** — one control, in the same place. If you
withdraw it we stop the processing it covered; §6.7 says honestly what withdrawal cannot undo.

**AND THERE ARE THREE OF THESE CONSENTS, NOT ONE.** Recording your political opinions, **training
AI on them**, and **sending them outside our company so other parties can train on them** are
three genuinely different things, so we ask you three separate times:

| Consent | Covers |
| --- | --- |
| **1. To record** | holding your political positions on a hosted service at all |
| **2. To train** | using them to train **our own** AI models (§11.6) |
| **3. To train outside** | providing them to parties **outside our company** for **their** AI training (§11.6) |

**Consent to record is not consent to train, and consent to train is not consent to train outside
our company.** Each is asked separately, each is refusable on its own, and each is withdrawable on
its own without affecting the others. *(Flagged for counsel — Appendix E.)*

*Flagged for counsel — Appendix E.*

**6.2 Manifestly made public — Article 9(2)(e).** For content you **deliberately publish**, we
also rely on the condition for data a person has manifestly made public. **This covers only what
you chose to publish.** It does not cover a position sitting in a file on your own machine, it
does not cover anything you drafted and did not publish, and **it does not cover an inference
about your leaning.** §7.10 explains where the line falls and when you cross it.

**6.3 Contract — Article 6(1)(b).** Your account, your session, and (when built) your
subscription and billing.

**6.4 Legitimate interests — Article 6(1)(f).** Security, abuse prevention, service integrity,
and fixing faults. We carry out and record a balancing test for each of these rather than
asserting the basis; you may ask us for the assessment (§18.1).

**6.5 Legal obligation — Article 6(1)(c).** Tax and accounting records, mandatory reporting where
it applies, and responding to valid legal process.

**6.6 Consent — Article 6(1)(a).** Anything optional: non-essential cookies (we currently set
none — §13.1) and any marketing email.

**6.7 Withdrawing consent, and what it cannot undo.** Withdrawal stops future processing. It
**does not** reach: content already published and propagated to a federated network, which we
cannot recall (§10.2); records we must keep by law (§12.4); or anything a model was trained on,
which cannot be untrained (§11.7). We tell you this **before** you consent, not after you
withdraw.

**6.8 Where the basis is stated.** Each basis is named **in the section describing the processing
it covers**, and again in the table at §4.1, so you can see which basis covers which use without
holding two sections in your head at once.

---

## 7. Political Opinions as Sensitive Data

**7.1 This is the product, not a side effect.** We The Citizens exists so that a citizen can
record what they believe about how their society is governed, reason it through, and act on it.
**Your political opinions are the content of this product.** We are not going to bury that in a
data-categories list.

**7.2 That makes them special category data.** Under **Article 9 of the GDPR and the UK GDPR,
"political opinions" are special category data** — processing is prohibited unless a specific
condition applies. §6.1 and §6.2 say which conditions we rely on and for what.

**7.3 An inference is treated exactly like a statement.** If anything about how you use this
product would let us infer a political leaning, **that inference is special-category data just as
much as a position you typed**, and it gets identical treatment. We do not treat "we only
inferred it" as a lesser category.

**7.4 THE FRONT DOOR IS ITSELF A POLITICAL DISCLOSURE — and here is exactly where we stand
today.** The plan for this product includes four party front doors — WeCitizensR.com,
WeCitizensD.com, WeCitizensL.com and WeCitizensSocialism.com — as different front pages of one
application. **A citizen who arrives at one rather than another has disclosed a political
affiliation by hostname alone, before doing anything at all.** No comparable platform has this
problem, and we are not going to pretend it is not there.

**What is true today, as audited on 2026-08-19: this feature does not exist.** There is no
edition concept, no host-based routing, and no party page in the application. The `Host` header
is read in exactly one way — to check whether a request came from your own machine — and **the
value is compared and discarded, never written to any log or record.**

**What we commit to, rather than what we hope.** We will not promise never to build it. We
commit that **if host-based editions ship, this policy is updated and notice is given before they
go live**, because that is the moment we would begin processing inferred special-category data at
first request. And §3.8 already applies regardless: **our host and any CDN see the hostname you
connected to even where our application never records it**, and no policy of ours changes that.

*Flagged for counsel — Appendix E.*

**7.5 Extra safeguards for this category.** Access is restricted to the people who need it for a
named purpose (§15.6). It is **never used for advertising** (we have none), **never enriched from
a third-party source**, and **never used to profile you for targeting**.

**7.6 We treat political opinion as sensitive everywhere, by choice.** GDPR and UK GDPR compel it.
Most US state statutes do not — see §18.3. **We apply the same protection worldwide anyway, as a
matter of our own policy.** We say "by choice" rather than claiming every jurisdiction requires
it, because the first is true and the second is not.

**7.7 We do not say "we do not process sensitive information."** Several political publishers
write exactly that sentence while collecting reading history and selling inferences. **For us it
would be false on the first screen of the product**, and we would rather tell you what we do with
sensitive data than deny holding any.

**7.8 The narrower claim we do make.** We do not **use or disclose** your political opinions for
any purpose other than those in §5 — which is a purpose-limited statement we can stand behind,
rather than a denial that we hold them.

**7.9 Never filed under a friendlier heading.** We do not classify political opinion as
"demographic data" or any similar marketing category, **and we do not process it on legitimate
interests.** It is named for what it is and it runs on Article 9.

**7.10 Crossing from private to published.** The moment you publish, the basis changes from your
explicit consent (§6.1) to data you have manifestly made public (§6.2), **and the consequences
become irreversible** (§10). We surface that **at the moment you publish**, in the product — not
afterwards, and not only in this document.

**7.11 The DPIA.** \{DPIA_STATUS\} — §22.5.

---

## 8. Sharing and Disclosure

**8.1 SELLING — WHAT WE PROMISE, AND THE ONE QUESTION WE HAVE NOT ANSWERED.**

**What we promise flatly, with no exception:** we do not sell, rent, licence, or trade your
personal information **as a mailing list, a contact list, a voter file, or a marketing audience**,
to anyone, ever. We take no money for access to you.

**The question we are not going to pretend is settled.** We provide data to parties **outside our
company for AI training** (§11.6). The CCPA and CPRA define **"sell"** and **"share"** broadly —
they reach disclosure for *valuable consideration* and for *cross-context* use, and money need not
change hands. **Whether that arrangement is a "sale" or a "share" in that technical sense is a
question we have referred to counsel and have not yet resolved.** Until it is resolved we are
**not** making the flat "we do not sell your personal information" claim that this section used to
carry, because we would rather leave a visible open question than make a statement we cannot yet
stand behind.

**What that means for you in the meantime, and it is the safer outcome for you:** we are
**treating it as though it were** a sale and a share. **You may opt out** — see §18.2 and the
"Do Not Sell or Share My Personal Information" control — and **opting out costs you nothing**,
under §18.2's non-discrimination rule. If counsel concludes it is a sale, this section is rewritten
and the opt-out becomes a formal legal right rather than a voluntary one. If counsel concludes it
is not, the opt-out stays anyway.

**8.2 Service providers, by category.** Where we use one, it is: hosting, payments, email,
media/CDN, and the AI provider. **We list no vendor we do not use**, which is why this list is
short — most of those categories are empty today because the surfaces that would need them are
not built (§2.3).

**8.3 Who we actually share with today.** As of the draft date: **your identity provider**
(Google, if you sign in) and **the AI provider** (only if AI is enabled — §11). That is the
complete list.

**8.4 NO SHARING WITH CAMPAIGNS, PARTIES, COMMITTEES, PACs, OR POLITICAL DATA BROKERS. Ever.**
There is an industry — NationBuilder, NGP VAN, i360, Aristotle, L2, Catalist and others — whose
business is building files on voters' political affiliations and selling access to them.
**We are not in that business, we do not buy from it, we do not sell into it, and we do not
enrich anything we hold from it.** For this product that promise is worth more than any feature,
and it is written as an absolute rather than as a default with exceptions.

**8.5 The sub-processor list.** We publish the sub-processors we use, with **purpose, processing
location, and transfer safeguard** for each, and we keep it current. **Where our AI provider is
listed, note that it has sub-processors of its own** — the chain runs two levels deep, and we say
so rather than stopping at a vendor name (§11.9).

**8.6 Publication at your direction.** When publishing exists, what you publish goes where you
told it to go, and §10 governs.

**8.7 Aggregated and de-identified data.** Where we ever aggregate or de-identify, we say so, we
do not attempt re-identification, and we contractually bind anyone we give it to not to attempt
it either. **We also tell you the limit honestly: de-identification is not a guarantee**, and a
small enough population can be re-identified from data that looks anonymous.

**8.8 Corporate transactions.** In a merger, acquisition, or insolvency, data may transfer to a
successor. **The successor is bound by this policy as it stood**, and a change to how
special-category data is used requires fresh explicit consent under §23.3 — it is not something
an acquirer can simply announce.

**8.9 Researchers and academics.** We intend to offer a deliberate, on-terms access channel for
independent research using **aggregated, de-identified data only**, published on our terms rather
than conceded later under pressure. **It does not exist yet.**

**8.10 Every limit is written as a carve-out, not a slogan.** Where this section says we do not
share something, it names the exceptions in the same sentence — because a bare denial reads as
marketing and a denial with its exceptions reads as a commitment.

---

## 9. Law Enforcement, Government Requests, and Transparency

*This section will be read closely by exactly the people we most want to trust us. It is written
for them.*

**9.1 START HERE: WHAT WE CANNOT HAND OVER, BECAUSE WE NEVER HAD IT.** **It is not possible for
us to produce your positions, your values, your evidence, your reasoning chains, or your drafts
in response to any legal request, because we do not have them.** They are files on your computer.
No warrant, subpoena, court order, national security process, or foreign request can compel us to
produce data we never received. This is not a policy we could be persuaded to change; it is a
consequence of how the product is built (§3.2).

**9.2 The short list of what we could actually produce.** Under valid legal process, for a
hosted account, the complete set is: **your email address, your display name, your profile
picture, the identifier your login provider gave us, the fact that sessions existed, and any
support correspondence you sent us.** When billing exists it adds subscription records (§12).
**That is the whole list, and its shortness is the point.**

**9.3 What we require.** Valid legal process, properly served, from an authority with
jurisdiction. **We object to overbroad, vague, or improperly issued requests, and we narrow them
where we can.** We use legal means to resist disclosure where there are grounds to, and we
continue until the available remedies are exhausted.

**9.4 We tell you.** **We notify you before disclosing anything about you, so that you have the
opportunity to object** — unless we are legally forbidden from doing so, or there is an emergency
under §9.5. Where a gag order prevents notice, **we notify you as soon as it lapses.** There is
no "with or without notice to you" escape hatch in this commitment.

**9.5 Emergencies.** We may disclose without prior notice only where we believe in good faith
that there is **a genuine risk of death or imminent serious bodily harm** to a person, and only
the information relevant to preventing it.

**9.6 Mandatory reporting we cannot refuse.** Child sexual abuse material must be reported to the
National Center for Missing and Exploited Children under 18 U.S.C. §2258A. **We comply and we do
not notify the account.**

**9.7 Foreign and cross-border requests.** We require a recognised route — a mutual legal
assistance treaty, letters rogatory, or an equivalent — and do not treat a foreign request as
self-executing.

**9.8 National security process.** We say what we are lawfully permitted to say, and no more.
Where we are permitted to publish only a range rather than a number, we publish the range.

**9.9 Transparency report.** We intend to publish, on a stated cadence, the number of requests
received, the number complied with in whole or in part, and the number refused. **It does not
exist yet** — see Appendix D.

---

## 10. Federation and Irreversibility

**10.0 Not yet built.** Publishing to a federated network is not implemented as of the draft
date. Today, "publishing" inside the application sets a flag on your own record and sends nothing
anywhere. **This section is written before the feature ships**, because the one thing a citizen
must understand about federated publishing is something they need to know *before* they use it.

**10.1 What publishing will do.** Content published to a federated network is copied to relays,
media servers, and instances **operated by other people, not by us**. It propagates automatically
and quickly.

**10.2 WE CANNOT DELETE IT.** Once content has propagated, **deleting our copy does not remove
the copies held by anyone else.** Other operators may honour a deletion request, may ignore it,
may be offline, or may have already been archived by a third party. **We will not describe a
downstream deletion request as a deletion, because it is not one.**

**10.3 What a deletion request actually does.** We delete our copy, and we send a deletion
request downstream where the protocol supports one. **That is the whole of what we can do**, and
we would rather tell you that plainly than let the word "delete" imply more.

**10.4 Two separate controls, not one ambiguous button.** You will have **"delete my account"**
and **"retract my published position"** as distinct actions with distinct wording, because they
do different things and one does not accomplish the other. Deleting your account does not retract
what you published.

**10.5 The warning comes at posting time.** The fact that a published position becomes part of a
permanent public record is shown to you **at the moment you publish** — not discovered later in a
deactivation screen.

**10.6 Public keys, relay lists, and media URLs are data, and they are public.** They can be used
to link your activity across services. Publishing under a key associates everything published
under that key.

**10.7 Other instances are separate controllers.** Operators of relays, media servers, and other
instances decide for themselves what they keep and for how long. They have their own policies,
and we have no authority over them.

**10.8 Information you make public loses protections.** Personal data you deliberately make
public **is not subject to the same legal protections** as data you keep private. That is a
consequence of publishing, not a policy of ours.

---

## 11. AI Processing

**11.1 THE AI IS OFF UNLESS SOMEONE TURNS IT ON, AND IT RUNS LOCALLY BY DEFAULT.** Verified
against the source on 2026-08-19. The reasoning feature has two engines: a **deterministic,
offline engine that runs entirely on your own machine**, and a live engine that calls an outside
provider. **The live engine is used only if whoever installed the application supplied an API
key.** With no key, **no AI call is ever made** and your text never leaves your computer. Every
failure of the live engine — no key, no network, an error, an unusable answer — falls back to the
local engine.

**11.2 Which provider, and what is sent.** When the live engine is enabled, the provider is
**Anthropic** and the model is a Claude model. **What is sent is the text of the position or
reasoning you asked to have checked** — which means your political opinions are the payload. A
single request is sent; nothing else about you accompanies it.

**11.3 What WE keep of it.** We record **the name of the model that answered** in your own
decision record, on your own machine. **We do not store the request or the response** anywhere
else.

**11.4 AI output about other people.** A reasoning chain may conclude something about a named
official or public figure. **That output is personal data about that person**, and they have
rights in it even though they never signed up. §18.9 says how they exercise them. Nearly every AI
product's policy ignores this; ours does not.

**11.5 What the PROVIDER keeps, and this is not ours to promise away.** Everything we can
truthfully say about the provider is bounded by the provider's own contract, and here is what it
says today:

* **The PROVIDER does not train on inputs — but WE DO. Read those two facts together.** The
  commercial terms we would operate under state that **the provider** may not train models on
  customer content. That is a contract term, not a policy statement, which is why we are willing
  to repeat it — **and it is a fact about the provider, not about us. We train. See §11.6.**
  Neither sentence is complete without the other.
* **This depends on being on the commercial surface.** The same provider's **consumer** service
  trains on inputs **unless the user opts out**. An opt-out default is not valid consent for
  special-category data. **This is the single most important fact for you to be able to rely on
  and the one we must verify per deployment** — see Appendix C.
* **Retention: 30 days by default.** Inputs and outputs are deleted from the provider's systems
  within **30 days**.
* **THE LONGER TAIL, WHICH YOU SHOULD KNOW ABOUT.** If the provider's automated safety systems
  flag a request, the provider retains **the inputs and outputs for up to 2 years** and **a
  safety classification score for up to 7 years**. **Political content is exactly the sort of
  content most likely to trip such a classifier.** That classification is an inference about your
  political speech, held by a third party, triggered by a system neither you nor we can see, and
  **it survives any deletion we perform.** We are telling you because you cannot find it out any
  other way.
* **We cannot guarantee deletion at the provider.** We can ask. We cannot promise.

**11.6 WE TRAIN AI ON YOUR DATA — OURS, AND OTHER COMPANIES'. Read this section twice.**

This is the most consequential disclosure in this policy, and it is also in the summary at the top
(§The Short Version) because it is too important to be found only here.

**(a) We train our own models.** Data that reaches us is used to develop, train, fine-tune, and
improve **our own** AI and machine-learning models.

**(b) It is also used to train AI OUTSIDE our company.** We provide data to parties outside our
company **for their own AI training**. This is a separate fact from (a), it carries more weight
than (a), and **we are stating it on its own line so it cannot be missed inside the first one.**

**(c) WHAT IS AND IS NOT INCLUDED — \{TRAINING_CATEGORIES\}.** *(Open item — the exact category
list is being settled and will be named here before this policy is published. The candidates are:
published content; the text you submit to an AI feature; positions held on a hosted service;
community contributions; and support correspondence. We will not describe this as "your data" and
leave you to guess — Appendix A.)*

**(d) WHAT IS NEVER TRAINED ON, BY ANYONE — and this is the part to hold on to.** **Data that
never leaves your computer cannot be trained on by us or by anybody else, because we never receive
it.** Your local positions, values, evidence, reasoning chains, drafts, and private notes are
outside all of this **by construction, not by promise** (§3.1–§3.2). It is not a policy we could
reverse. **If you want certainty that something is never used to train an AI, do not publish it
and do not submit it to an AI feature — and then nothing else you do matters.** The local-first
split was always this product's best privacy feature. It is now its most important one.

**(e) It is consented, separately, and you can refuse.** Training requires **consent 2** under
§6.1, and training outside our company requires **consent 3**. Each is asked on its own, each is
refusable without losing the other, and each is withdrawable on its own.

**(f) Do not confuse our AI vendor's promise with ours.** §11.5 says our AI vendor's commercial
terms state that **the vendor** may not train on what we send it. **That is a fact about them. It
is not a fact about us. We do train.** Both sentences are true at the same time and we are putting
them next to each other so that neither can be read alone.

**11.7 TRAINING IS IRREVERSIBLE — THE SAME ONE-WAY DOOR AS PUBLISHING.** Once data has been used
to train a model, **it cannot reliably be removed from that model.** This is not a limitation of
our diligence; it is a property of the technology, and AI providers say so themselves — correction
is a reasonable-effort obligation that *"may not always be possible,"* and rights over training
data *"have technical limitations."*

**So be clear about what withdrawing consent does.** Withdrawing consent 2 or consent 3 **stops
future training.** It **does not** remove anything from a model already trained, and it does not
reach a model an outside party has already trained. **We will never describe a training-data
deletion request as a deletion**, exactly as we will never describe a federated deletion request as
one (§10.2–§10.3).

**This product now has three one-way doors, and you should know all three before you use it:**
publishing to a federated network (§10.2), anything already inside an AI vendor's systems (§11.5),
and **training** (this section). **Everything you keep local passes through none of them.**

**11.8 No provider protects the sensitivity — only we do, and now the same applies to whoever we
train with.** We read the published terms of five major AI providers. **Not one of them mentions
Article 9, special-category data, or political opinions at all.** Their commitments cover training,
retention, access, and location — **none covers the fact that what is being processed is a
citizen's political belief.** Choosing a careful vendor does not discharge that obligation, and
**neither does choosing a careful training partner.** Any party outside our company that receives
data for training is bound by contract to the purpose limits in §11.6 and may not re-share it;
that is a contractual protection, and we are telling you plainly that it is a weaker guarantee
than the architectural one at §11.6(d).

**11.9 The chain runs two levels deep.** Our AI provider has its own sub-processors — cloud and
network infrastructure across many countries. We name them in the sub-processor list (§8.5) and
subscribe to the provider's change notifications so that list stays true.

**11.10 Human review at the provider.** Where a provider's safety systems flag content, a
reviewer may see it. We disclose the controls the provider publishes — flagged-content-only
access, per-request queries, hardened workstations, and approval by a manager — and, where
available, **which jurisdiction those reviewers sit in.**

**11.11 The AI can be wrong, and the correction route is a rights route.** AI output may be
incorrect, incomplete, or fabricated. **Your right to rectification applies to inferences, not
just to facts** — you can challenge a conclusion the AI reached, and so can a person the AI wrote
about. It is the **same channel** as reporting a mistake (§24.6), on purpose.

**11.12 No automated decisions about you.** **No decision producing legal effects or similarly
significant effects is made about you by automated means.** The AI advises you; it does not decide
anything about you, and it does not gate access, price, moderate, or rank you. If automated
moderation is ever introduced, **this section changes before it launches.**

---

## 12. Payments

**12.0 Not yet built.** There is no payment processing in the product as of the draft date — no
processor is integrated and no billing data exists. This section is written in advance and takes
effect when payments launch.

**12.1 What the processor gets and what we get.** **Your full card number goes to the payment
processor and never to us.** We receive and store: a **processor token**, the **last four
digits**, the **card brand**, the **expiry date**, the **issuing country**, and your **billing
address**. We say exactly that rather than "we do not store payment information," which is
usually not quite true.

**12.2 The processor is its own controller.** It processes your payment data for its own purposes
under its own privacy policy, and those purposes are not ours to control.

**12.3 One record per subscription.** Where you hold several concurrent subscriptions, each has
its own billing record. **Cancelling one does not cancel the others, and deleting your account
does not cancel any of them** — each is cancelled separately. That means a billing record can
outlive an account-deletion request; the Terms of Service says the same thing at its §15.

**12.4 TAX RECORDS OVERRIDE YOUR DELETION REQUEST, AND YOU SHOULD KNOW THAT UP FRONT.** We are
required to retain invoices and accounting records for a statutory period **\{TAX_RETENTION\}**
even after you delete your account. This is a genuine conflict between your erasure right and a
legal obligation, and the obligation wins. **What it means in practice: those records are locked
away and are not accessed or used by anyone during that period**, except to meet the legal
obligation itself or in a dispute — and when the period expires they are permanently deleted.

**12.5 Chargebacks.** A dispute creates a record shared with your card network and the processor.

**12.6 Donations.** We do not currently take donations. **If we ever do, and if any donation is
politically reportable, disclosure of your identity may be legally mandatory** — that is a
privacy consequence you must be told about **before donating, not after**, and we will surface it
at that point.

**12.7 We remove payment details we no longer need.** Where a stored card is no longer valid or
no longer needed, we delete it rather than holding it until someone asks.

---

## 13. Cookies, Tracking, and Analytics

**13.1 What we set.** A **session cookie**, so that you stay signed in. On a hosted service it is
marked `Secure`. **That is the only cookie the application sets, and it is strictly necessary.**
There are no non-essential cookies, so there is no consent banner to click through — because
there is nothing to consent to.

**13.2 Analytics: NONE. We run no analytics product of any kind.** Verified
against the source on 2026-08-19 — no analytics library of any kind is present in the
application. If we ever adopt one it will be a **self-hosted, IP-anonymising** installation, we
will **name the product here**, and §23.2 notice applies first.

**13.3 No third-party or social pixels.** None. No advertising pixel, no social widget, no
tracking beacon, no third-party script that reports on you.

**13.4 No advertising.** **We do not show advertising anywhere in this product**, which is why
most of the machinery a privacy policy usually needs — ad identifiers, targeting opt-outs,
interest categories, cross-context behavioural advertising disclosures — has nothing to describe.

**13.5 Global Privacy Control and Do Not Track.** **We honour the Global Privacy Control signal**
as an opt-out. We run no advertising and no analytics, so there is nothing there for it to switch
off — **but it is not a decorative commitment any more.** Because we treat providing data to
outside parties for AI training as a "share" pending counsel (§8.1), **a GPC signal is honoured as
an opt-out of consent 3** (§6.1, §11.6). We also state our Do Not Track position rather than
dismissing it: we honour it the same way.

**13.6 No pixel anywhere near video.** When WeTheCitizens.tv exists, **no advertising or
analytics pixel goes on any page where video plays.** This is a legal landmine, not a preference —
§16.

**13.7 Local storage on your device.** The application stores your session and interface
preferences locally in your browser. It is on your machine, it is not transmitted, and clearing
your browser storage removes it.

**13.8 Email tracking.** **We do not use open tracking or click tracking** in email.

---

## 14. Children

**14.1 Minimum age.** You must be at least **\{MINIMUM_AGE\}** years old to create an account. This
is the same number as the Terms of Service, and it must be stated identically in both documents.
*(Open item — Appendix A.)*

**14.2 The absolute floor.** **No accounts for anyone under 13, and we do not knowingly collect
personal information from anyone under 13**, regardless of what \{MINIMUM_AGE\} is set to.

**14.3 If we learn of one.** We delete the account and the associated data. A parent or guardian
can contact us at \{PRIVACY_CONTACT\} to ask about, correct, or delete a child's data.

**14.4 COPPA and the children's codes.** We comply with the Children's Online Privacy Protection
Act. Where we serve minors at all, the UK Age Appropriate Design Code and equivalent EU
requirements apply.

**14.5 What age assurance we actually do.** **We currently do no age verification beyond asking.**
We say what we do rather than what we wish we did. *(Appendix C.)*

---

## 15. Security

**15.1 What we actually do.** Data in transit to a hosted service is encrypted with TLS, and
`Secure` cookies and strict transport security are enforced in hosted mode. Session secrets are
generated per installation and stored with restricted file permissions. Access to any production
system is limited to people who need it. Application input that reaches a log is sanitised
against injection.

**15.2 The strongest security control in this product is that we do not hold your data.** Data we
never receive cannot be breached at our end. Local-first is a privacy design, but it is a security
one too.

**15.3 We claim no certification.** **We do not hold SOC 2, ISO 27001, or any other security
certification**, and we will not imply one. If we ever obtain one we will name the auditor and
the scope.

**15.4 We do not promise your data is safe.** **No system is perfectly secure and we will not
tell you otherwise.** We use reasonable technical and organisational measures. That is a real
commitment and it is not a guarantee.

**15.5 Your side of it.** Your account is only as secure as your login. Use multi-factor
authentication with your identity provider. **And note the local-first consequence: the security
of your positions is the security of your own computer** — its disk encryption, its screen lock,
its backups. We cannot protect files we never receive.

**15.6 Who can see special-category data.** Access to any system holding political opinions is
restricted to named people for a named purpose, and reviewed. Where a third party can ever see
such content — the AI provider's safety review is the only case today — §11.10 says under what
controls.

**15.7 Breach notification, with real deadlines.** If a breach affects your personal data we
notify the relevant supervisory authority **within 72 hours** of becoming aware of it, where GDPR
requires, and notify you **without undue delay** where the breach is likely to result in a high
risk to your rights. State-law deadlines apply where they are shorter. **We will not promise
"immediate" notice**, because that is a word nobody can keep and it tells you nothing.

**15.8 Reporting a vulnerability.** Report security issues to \{PRIVACY_CONTACT\}. We will not
pursue legal action against good-faith security research conducted within a reasonable
disclosure process.

**15.9 Data pending deletion.** Where data is awaiting deletion in a backup, it is **isolated from
any further processing** until the backup rotates. It is not used for anything in the meantime.

---

## 16. WeTheCitizens.tv and the Video Privacy Protection Act

**16.0 Not yet built.** There is no video service, no viewing data, and no `.tv` surface in the
product as of the draft date — verified against the source on 2026-08-19. This section states the
rules that will govern it before it is built, deliberately, because the statute below makes
retrofitting expensive.

**16.1 What we intend to keep: nothing that leaves your machine.** Designed local-first, **your
viewing history need never reach us at all.** Where that holds, the honest answer to "who gets
your viewing data" is **nobody**, and the disclosure trigger of the statute below is never pulled.

**16.2 THE VIDEO PRIVACY PROTECTION ACT — 18 U.S.C. §2710.** The VPPA restricts disclosing a
consumer's video-viewing history. It carries **statutory damages of $2,500 per violation** and a
**private right of action**, and it is one of the most actively litigated privacy statutes in the
United States. The typical defendant is a site that placed a third-party pixel on a page where
video plays. **The operational rule that follows is absolute: no advertising or analytics pixel,
tag, or beacon goes anywhere near viewing data.** *(Flagged for counsel — Appendix E.)*

**16.3 For us it is doubled.** A viewing history on a **political** video service is **both**
VPPA-protected **and** a revealed political opinion. **Two statutes over one data set**, which is
why this section is stricter than a normal streaming service's.

**16.4 If viewing data ever leaves us**, it goes only under **separate, standalone, revocable,
VPPA-form written consent** — not under this policy, not under the Terms of Service, and not
bundled with anything else.

**16.5 No "because you watched," anywhere.** No viewing-derived recommendation, title suggestion,
or interest signal is surfaced to any third party, partner interface, or recommendation exchange.

**16.6 Purchases and rentals.** Where pay-per-view exists, a purchase record is a billing record
under §12 and is retained on that basis — **separately from viewing behaviour**, which is not
retained at all.

---

## 17. Retention and Deletion

**17.1 The table.** Organised by **where the data lives**, because for this product that is the
fact that matters most.

| Where | Data | How long |
| --- | --- | --- |
| **Your machine** | positions, values, evidence, reasoning, drafts, laws, ledger | **Never transmitted. Yours indefinitely, and yours to delete.** We hold nothing and can delete nothing. |
| **Your machine** | application and error logs | **5 MB per file, 5 rotations kept**, then overwritten automatically. Delete them yourself at any time. |
| **Hosted** | account identity | life of the account, then §17.3 |
| **Hosted** | session records | until the session ends |
| **Hosted** | support correspondence | **UNVERIFIED** — Appendix C |
| **Hosted** | moderation and abuse records *(not built)* | **UNVERIFIED** — Appendix C |
| **Hosted** | billing and tax records *(not built)* | **\{TAX_RETENTION\}** — statutory, overrides deletion (§12.4) |
| **Processor** | AI request and response | **30 days**; **2 years** if flagged; **7 years** for a safety classification score (§11.5) |
| **Federated** | published content *(not built)* | **permanent and beyond our reach** (§10.2) |

**We would rather show you an UNVERIFIED row than invent a number.** A retention period we made
up because it sounded reasonable would be a false statement about our own practices, and those
rows are exactly what Appendix C exists to close.

**17.2 The outer bound.** No purpose described in this policy requires us to keep personal
information about you for longer than you have an account, **except** the specific survivals
listed at §17.3.

**17.3 What account deletion removes, and what survives it.** Deleting your account removes your
account identity, your sessions, and your hosted content. **It does not remove:**

* content already published and propagated to a federated network — **we cannot recall it**
  (§10.2);
* records we must keep for tax and accounting — locked and unused until they expire (§12.4);
* moderation and abuse-prevention records, including identifiers kept to prevent ban evasion,
  which we disclose here **before** we do it rather than afterwards;
* backups, until they rotate — with the data isolated from further processing in the meantime
  (§15.9);
* **a safety classification score held by our AI provider for up to 7 years, if one of your
  requests was flagged** (§11.5). This is not ours to delete.
* **anything a model was trained on**, which cannot be untrained — **ours or an outside party's**.
  Deleting your account stops future training; it does not reach a model already trained on your
  data, and we cannot recall data an outside party has already used (§11.6, §11.7).

**17.4 What "deleted" means, named store by store.** When we say we delete something, we mean it
is removed from the live database, from any cache, and from the working stores that serve it —
and from backups when they next rotate. We name the stores rather than leaving "deleted" as an
unqualified verb.

**17.5 Post-closure deletion timing.** *(Appendix C — not yet established.)* Where a number is
published it will be in days, not "promptly."

**17.6 Your local logs.** The application caps its own log files at **5 megabytes each and keeps
5 rotations**, then overwrites the oldest. These are files on your disk. **We never see them**,
and you can delete them at any time without affecting anything.

**17.7 Local data is not ours to retain or delete.** We do not retain your local files because we
do not have them, and **we cannot delete them for you** — you delete them yourself, with your own
file manager, without asking us and without us knowing.

**17.8 Inactive accounts.** *(Appendix C — no policy set. Where one is set it will be a stated
period after which an unused account is deleted automatically.)*

**17.9 Another citizen's speech is not yours to erase.** Your erasure right cannot be used to
delete a debate other citizens contributed to. Where a deletion would remove another person's
contribution, we remove your personal data and leave theirs. California law expressly recognises
this for **"the exercise by another consumer of his or her right to free speech."**

**17.10 Anonymisation instead of deletion.** Where we anonymise rather than delete, we say so, and
we state the limit honestly (§8.7).

---

## 18. Your Rights

**18.1 Your rights, in full.** Access · rectification · erasure · restriction of processing ·
data portability · objection · **withdrawal of consent at any time** · and **the right to
complain to a supervisory authority**, which we name at §24.4.

**18.2 California (CCPA/CPRA).** Notice at collection; the categories we collect, use, and
disclose; **the right to know, delete, and correct**; the right to limit the use of sensitive
personal information; and **non-discrimination** — using a right never costs you service, price,
or quality. **Our "Do Not Sell or Share My Personal Information" answer is that we do not sell or
share, at all** (§8.1), so there is nothing to opt out of.

**18.3 THE US POSITION IS NOT WHAT YOU MIGHT ASSUME, AND WE ARE NOT GOING TO OVERSTATE IT.**
**Under GDPR and UK GDPR, "political opinions" are expressly special category data.** That is
settled and we state it confidently. **US state privacy statutes are not uniform, and most of
their sensitive-data lists do not name political opinions.** California's CPRA lists "religious or
philosophical beliefs," which may or may not be read to reach political belief. **We are not
going to tell you US law settles this, because it does not.** What we do instead is §7.6: treat
political opinion as sensitive everywhere as a matter of our own policy. *(Flagged for counsel —
Appendix E.)*

**18.4 Other US states.** Virginia, Colorado, Connecticut, Utah, Texas, Oregon, Montana,
Tennessee, Minnesota and the rest of the state wave: consent for sensitive data where required,
opt-outs for targeted advertising, sale, and profiling — **none of which we do** — and data
protection assessments. We maintain the list of states whose laws we honour rather than arguing
later about which regime applies.

**18.5 Our response times, as real numbers.** **30 days** under GDPR and UK GDPR, extendable by
two further months for complex requests, and we will tell you if we extend. **45 days** under US
state laws, extendable once by a further 45 days.

**18.6 How to make a request — with buttons, in the product.** Rights requests are made **in the
application**, not by postal mail and not only by email. \{PRIVACY_CONTACT\} works too. We verify
that a request is really yours proportionately to its sensitivity, and we accept **authorised
agent** requests with proof of authority.

**18.7 Appeals.** If we refuse a request you may appeal, and **the appeal is reviewed by someone
who was not involved in the original decision.** Virginia, Colorado, Connecticut, Minnesota,
Montana, Oregon, Tennessee and Texas require this route; **to use it, send us your full name and a
copy of the denial.** If we deny the appeal, **you may contact your state Attorney General**, and
we will tell you how.

**18.8 Export, and what it contains.** Most of your data is already an export: **your positions
and evidence are readable files on your own disk, in an open format, right now.** For hosted data
we provide a self-service export of your account information and your published content.
*(Appendix D — the endpoint is an operational commitment, not yet built.)*

**18.9 If you are not a user but you appear in someone's evidence.** Public figures, officials,
and anyone named in a citizen's reasoning **have the same rights as everyone else**, including
rectification of an inference the AI drew (§11.4, §11.11). Contact us at \{PRIVACY_CONTACT\}. **A
public figure who holds an account is a data subject like any other**, and nothing in the Terms of
Service — including its covenant not to sue — waives a statutory privacy right.

**18.10 Article 11 — where we genuinely cannot identify you.** For data that never left your
machine, **we cannot link it to you, because we do not have it.** Where we cannot identify a data
subject from the information we hold, Article 11 of the GDPR applies: we are not required to
acquire additional information purely to enable identification, and we will tell you so rather
than asking you to prove an identity we have no way to check.

**18.11 When we may refuse.** A legal retention obligation; an open security or abuse
investigation; another person's privacy or free-speech rights (§17.9); or a request that is
manifestly unfounded, excessive, repetitive, or technically impossible. **We always tell you which
one, and you can always appeal (§18.7).**

**18.12 YOUR RIGHT TO COMPLAIN TO A REGULATOR IS NEVER CONDITIONED.** The Terms of Service asks
you to use our internal complaint process, and then mediation, before other proceedings. **That
does not apply to a privacy complaint and could not.** You may complain to a supervisory
authority, a data protection authority, or a state Attorney General **at any time, without
contacting us first, without mediating, and without waiting for anything.** We are stating this
plainly so the two documents cannot be read as conflicting.

---

## 19. International Transfers and Regional Terms

**19.1 Where data is hosted.** For the local application, **on your own computer, in your own
country.** For hosted services, \{HOSTING_LOCATION\} — *(Appendix C: no deployment exists to
describe, so this cannot yet be stated as fact.)*

**19.2 Transfer mechanism.** Where personal data is transferred out of the EEA or the UK, we rely
on the European Commission's **Standard Contractual Clauses**, as amended by the UK Addendum for
UK data, or on an **adequacy decision** where one covers the destination.

**19.3 Our AI provider transfers data internationally.** Where the AI feature is enabled, the
provider processes data on servers that may be outside the EEA and the UK. **The provider's
deployment configuration — not merely its identity — determines where processing happens**, and
we state the configuration we actually use rather than the one that is theoretically available.
*(Appendix C.)*

**19.4 EU and UK representatives.** \{EU_REPRESENTATIVE\} — we will appoint **both an EU and a UK
Article 27 representative**, each with a postal address and a request route, and name them here.
*(Appendix A.)*

**19.5 Regional supplements.** Where a jurisdiction requires its own notice, we publish a
supplement that **expressly supersedes the main body on any conflict** for readers in that
jurisdiction, rather than pretending one document fits every country.

**19.6 Swiss, Brazilian, and Canadian users.** Where we serve them, the Swiss FADP, the Brazilian
LGPD, and Canadian PIPEDA apply and are addressed in the supplements at §19.5.

**19.7 EU Digital Services Act.** Where the hosted service is in scope, DSA transparency
obligations overlap this policy. We keep them coordinated with the Terms of Service rather than
stating them twice and differently.

**19.8 Language.** The English version of this policy controls. Translations are provided for
convenience.

---

## 20. Communications and Marketing

**20.1 Two kinds of email, and only one is optional.** **Transactional** email — security alerts,
account and billing notices, legally required notifications — you cannot opt out of while you
have an account. **Marketing** email you can opt out of at any time.

**20.2 Marketing is opt-in.** We do not send marketing email unless you asked for it, and every
one carries **one-click unsubscribe**. Unsubscribing takes effect immediately.

**20.3 CAN-SPAM and ePrivacy.** We comply with CAN-SPAM, and with the ePrivacy consent
requirement where it applies.

**20.4 Push and in-app notifications.** Controlled in settings and in your operating system.

**20.5 WE NEVER SHARE YOUR EMAIL ADDRESS WITH A CAMPAIGN, A PARTY, OR A COMMITTEE.** For a
political product this promise matters more than most, and there is no exception to it. See §8.4.

**20.6 What opting out does and does not change.** Opting out of marketing stops marketing email.
It does not stop transactional email, and it does not change anything about how your data is
handled — those are separate things and we would rather say so than let you assume otherwise.

---

## 21. Community Mode and Publishing

**21.1 What becomes visible, and when.** In individual mode, **nothing is visible to anyone** —
that is the default and it needs no action from you. In community mode, what you contribute to a
community is visible to that community, and you are told what will be shared before you share it.

**21.2 What a community steward can see.** A steward can see the membership of their community and
what members contribute to it. **They cannot see your local files**, your unpublished positions,
or anything you did not contribute.

**21.3 The steward is a controller in their own right.** Where a community steward collects data
about their members, **they are the controller of it and we are their processor**, bound by a data
processing agreement. Their handling is governed by their notice, not this policy.

**21.4 Which means rights requests go to the right place.** If your request concerns data a
community steward holds, **please contact that steward** — we cannot answer for their processing.
If you ask us and we cannot answer, **we will tell you who to ask** rather than leaving you stuck.

**21.5 Stated in both documents.** Our dual role — controller for some data, processor for other
data — is stated in the Terms of Service as well as here, so neither document can be read alone
and give the wrong answer.

**21.6 Public profiles.** What is public by default and what is public only by your choice will be
itemised here when community publishing ships (§4.6).

**21.7 Search engines and archives.** Anything public can be indexed, cached, archived, and
scraped by third parties **we do not control and cannot compel.** Removal from our service does
not remove it from their copies.

**21.8 Blocks and mutes.** Blocking someone is stored so we can enforce it. Be aware a blocked
party can often infer that they were blocked from the behaviour of the service.

---

## 22. Governance and Accountability

**22.1 Records of processing.** We maintain the Article 30 record of processing activities.

**22.2 Agreements with processors.** Every processor is under a written data processing agreement
with obligations at least equivalent to ours.

**22.3 Training and access review.** Staff with access to personal data are trained on handling
special-category data, and access is reviewed.

**22.4 Privacy by design — and the strongest evidence for it is the architecture itself.** The
best proof that a product minimises data is that it never receives it. **Local-first is our
Article 25 answer**, and it is a stronger one than any process document.

**22.5 Data Protection Officer.** \{DPO\}. Our core activity is large-scale processing of
special-category data, which **Article 37(1)(c) points squarely at requiring a DPO.** This is a
real obligation, not a formality. *(Flagged for counsel — Appendix E.)*

**22.6 Data Protection Impact Assessment.** \{DPIA_STATUS\}. A DPIA is required for large-scale
processing of special-category data, **which is exactly what this product is.**

**22.7 Vendor due diligence.** Especially for the AI provider, where — as §11.5 shows — **the
privacy-relevant facts are configuration settings, not the vendor's name.** We record which
configuration we run, dated, and re-check it.

**22.8 Verifiable artefacts, not adjectives.** **The source code of this product is public.** Every
claim in §3.5, §4.2, §13.2 and §13.3 is checkable by anyone who wants to read it, and we would
rather be checked than believed. We also intend to publish the sub-processor list with a change
history and the transparency counters at §9.9.

**22.9 The advisory group.** The product refers to a "board of directors," which is **a guide and
advisor group, not a corporate board.** Its members are not staff and not a processor.
**They do not have access to personal data**, and if that ever changes it will be stated here with
the access controls that apply.

**22.10 Third-party components and forks.** Community-contributed components and anything a
self-hosted fork ships are bound by a published developer policy: **client-side telemetry is
prohibited, and any network use must be disclosed.** This is how the §3.5 guarantee survives
contact with an extension ecosystem.

---

## 23. Changes to This Policy

**23.1 How we notify.** We post the updated policy with a new version number and effective date,
and notify account holders by email or in-product notice.

**23.2 Material changes get advance notice**, before they take effect — not after.

**23.3 A CHANGE TO HOW WE USE SPECIAL-CATEGORY DATA REQUIRES FRESH EXPLICIT CONSENT, NOT NOTICE.**
If we change how we process political opinions, **we ask you again.** We do not treat continued
use as agreement, and we do not roll a new purpose in under a notice banner. This is the
distinction most privacy policies get wrong, and it is the one that matters most here.

**23.4 Version history.** Every version is published with its date and a summary of what changed,
and previous versions stay available.

**23.5 No retroactive application.** A new basis or purpose applies to data collected **after** it
takes effect. Data collected under a narrower basis stays under that basis.

**23.6 Dated with equal care to the Terms.** This policy and the Terms of Service both carry a
visible effective date and version, maintained together.

**23.7 The summary and the body are the same document.** The Short Version at the top is checked
against the body, and the body is checked against the product, before each release. **A truthful
summary sitting over inaccurate detail is worse than no summary** — a regulator reads the body.

---

## 24. Contact

**24.1 Privacy contact and postal address.** \{PRIVACY_CONTACT\}.
**24.2 Data Protection Officer.** \{DPO\}.
**24.3 EU and UK representatives.** \{EU_REPRESENTATIVE\}.
**24.4 Your supervisory authority.** You may complain to your national data protection authority
— \{SUPERVISORY_AUTHORITY\} for EEA users, the **Information Commissioner's Office (ICO)** for UK
users — or to your state Attorney General. **You may do this at any time and you never have to
come to us first (§18.12).**
**24.5 Rights requests.** In the application, or at \{PRIVACY_CONTACT\} (§18.6).
**24.6 Reporting a mistake.** The same channel named in the Terms of Service for reporting
inaccurate content **is also the rectification channel** under this policy — for you, and for
anyone the AI wrote about (§11.11).

**Related documents:** the **Terms of Service** (the contract; this policy controls on any
question of what we do with personal data) · the **Cookie Policy** · the **DMCA policy** · the
**sub-processor list** (§8.5) · the **transparency report** (§9.9, when it exists).

---
---

# APPENDICES — NOT PART OF THE POLICY

*Everything below is working material for Bryan, engineering, and counsel. It is removed before
publication.*
