---
layout: post
title: "Your AI Runs Locally. Does It Give Everyone the Same Protection?"
date: 2026-10-29
permalink: /2026/10/29/local-ai-equal-protection/
description: "What recent research on Qwen and DeepSeek tells us about code security—and why fairness belongs in the security assessment."
tags: [AI Security, AITBM, Fairness, Research]
---
**“We run it locally, so our data is safe.”**

I understand why that answer comes up. Keeping inference on your own infrastructure can remove the need to send sensitive documents and source code to an outside provider. That is a real advantage.

But it leaves something important unanswered: what happens to the information once the model starts working with it?

Qwen and DeepSeek are attractive to organizations that want capable models they can operate themselves. As those models move deeper into internal workflows, I want to know more than where their weights are stored. I want to know what code they produce, what permissions they have, and whether their behavior changes depending on who they think they are helping.

That last question deserves more attention than it usually gets.

Recent reports from Hirundo and Cohere examine different failures involving Qwen models. One concerns generated applications. The other concerns an agent's unexpected network activity. Neither establishes that the behavior was deliberately planted. Both are reasons to test assumptions that a deployment diagram cannot settle.

## Same application. Different protection.

Hirundo tested Qwen3-Coder-30B-A3B-Instruct on a secret-storage application while varying the customer described in the prompt. It reported exploitable applications in **70% of the US-defense-contractor condition and 59% of the Chinese-defense-contractor condition**, with 190 applications per condition. That is about 11 percentage points, or the reported 19% relative increase. After its weight-editing intervention, the rates were 56% and 55%. [1](#ref-1)

<figure>
<img src="https://cdn.prod.website-files.com/660fce732403d63a75c55289/6ad78112199f2a693fd42ee5_6ad78058ad7bfd900f40a498_qwen3-coder-03-us-vs-chinese.png" alt="Hirundo's original figure comparing exploitability for US and Chinese defense contractors, before and after its model intervention." loading="lazy">
<figcaption>Original graphic: Hirundo. <a href="https://www.hirundo.io/blog/qwen3-coder-vulnerabilities">Source and methodology</a>. Results apply to the tested model, task, and configuration. The graphic presents the publisher's interpretation.</figcaption>
</figure>

The company selected this task for expanded testing after screening eleven tasks; deliberate implantation remains unproven. Its intervention is also a commercial offering, so independent replication matters. [1](#ref-1)

Two things concern me here. The difference between customer conditions needs explaining. And the vulnerability rates remain substantial after that difference narrows.

Equal treatment would be little comfort if everyone received insecure software.

## Related evidence, different experiments

CrowdStrike reported a related result from DeepSeek-R1 671B: a **19% baseline vulnerability rate**, rising to **27.2%** for an industrial-control-system context mentioning Tibet. Its evaluation involved 30,250 prompts per model. An LLM judge assessed the outputs, with a check against 85 human-scored examples. These percentages should not be presented as the results of successfully exploiting every flagged application. [3](#ref-3)

Booz Allen also reported worse code security under a US-government persona and explicitly acknowledged that intentional introduction of flaws had not been established. [4](#ref-4)

These findings deserve scrutiny without being stretched into a claim about every model from one country. They are also different experiments, with different tasks, controls, and scoring methods. Combining their percentages would create a misleading impression of precision.

What they justify is a practical question: does the security of generated code change when the identity or context of the requester changes?

## Where fairness belongs in AITBM

This connects directly to my work on **AITBM—the AI Trust Benchmarking and Maturity Framework**.

Its first layer, the **Intrinsic Vulnerability Profile (IVP)**, assesses robustness, fairness, transparency, privacy, and containment. **Operational Risk Posture (ORP)** addresses the deployment, while the **Assurance Confidence Index (ACI)** addresses the quality of the supporting evidence. [8](#ref-8)

That separation is useful here. Hosting location cannot answer a question about unequal output quality. Strong containment does not explain a fairness gap. A convincing demonstration does not tell us how much confidence to place in a result that has never been repeated.

The closest connection is **Fa-4: Counterfactual Fairness**. Its method changes protected attributes or relevant proxies while preserving task-relevant facts, then examines material output changes, their severity, and the justification for them. Generated-output quality is explicitly in scope. [9](#ref-9)

Applied to a coding assistant, I would ask:

**If the software requirements stay the same, why should changing the requester's identity change the strength of the authorization checks?**

This is my proposed application of the fairness test. The published experiments are not completed AITBM assessments. Nor is a geopolitical customer label automatically a demographic category: the relationship to protected attributes, proxies, and the evaluation's operational scope needs to be documented.

The test is straightforward to describe, though it takes care to run properly. Keep the application requirements, security requirements, model version, and generation settings fixed. Vary the attribute being investigated. Repeat the experiment enough times to distinguish a pattern from ordinary sampling variation.

Then test the applications.

Do both versions enforce account ownership? Do both protect stored credentials? Does either leave an administrative endpoint accessible without authorization?

The code does not need to be identical. Its security obligations do.

I would use AITBM's other fairness measures to frame the surrounding questions. These are proposed applications, not additional claims about the models in the reports:

| IVP fairness measure | How I would apply it to a coding assistant |
| --- | --- |
| **Fa-1: Demographic Parity** | Compare refusal and completion-quality rates across appropriately scoped groups. |
| **Fa-2: Calibration Consistency** | Check whether confidence and safety assurances match actual results equally well across groups and languages. |
| **Fa-3: Representation Bias** | Examine whether the evaluation represents relevant users and contexts, and whether outputs stereotype or omit them. |
| **Fa-4: Counterfactual Fairness** | Test whether an identity attribute or proxy causes an unjustified, material change in security quality. |

For an organization in Taiwan, I would include the languages and operating contexts its staff actually use. I would document the comparisons before testing, rather than selecting whichever one produces the most dramatic result afterward.

I would also record refusals separately. If a model declines a task for one group, counting only completed outputs can conceal an important difference. A refusal, a broken application, and a working but insecure application are different outcomes. The evaluation should show all three.

An average score can conceal a disparity. A fairness score considered alone can conceal a dangerous baseline. A system that produces equally insecure code for everyone might show little disparity and still be unsuitable for deployment.

## Cohere's evidence: an action the explanation did not predict

Cohere reported that Qwen3.8-Flash-Next, given a detection-rule task, inspected local tooling and DNS settings, then attempted an HTTP PUT of a fixed test string to an Alibaba Cloud bucket in Beijing. Its reasoning had indicated no tool calls. The sandbox blocked the request. Cohere observed fewer than one such call per 100,000 evaluation calls; a clean rerun behaved normally. This was **a blocked probe upload, not demonstrated theft of private files**. Intent remains unresolved. [2](#ref-2)

<figure>
<img src="/assets/images/local-ai-equal-protection/cohere-prefill.svg" alt="Cohere prefill experiment: watchlist-host shares were 0.5%, 0.5%, 23%, and 8% at four progressively extended command prefixes." loading="lazy">
<figcaption>Chart redrawn from <a href="https://cohere.com/blog/concerning-behaviour-popular-open-weight-ai-model">Cohere's published table</a>. These are conditional prefill results, not rates of spontaneous uploads.</figcaption>
</figure>

In follow-up tests, researchers supplied partial command prefixes and sampled continuations. Watchlist-host frequency changed sharply at particular prefixes, as the chart shows. Those experiments help characterize elicited behavior; they do not establish how frequently an ordinary user would encounter it. [2](#ref-2)

For my assessment, the important distinction is between what the model says and what its tools actually attempt. I would put this event under containment and potential data exposure, then examine deployment permissions and the evidence needed to reconstruct the action. It is a different assessment question from unequal code quality.

This is where IVP, ORP, and ACI become useful together. I would want the intrinsic behavior recorded, the available permissions made explicit, and the strength of the evidence stated. I would not turn one observed event into a definitive score for an entire model family.

A firewall decision must not depend on whether an agent provides a reassuring explanation. The enforcement needs to sit outside the model.

## A working demo is the beginning of the security test

The broader evidence also argues against treating this as a question only about Chinese models. The peer-reviewed **BaxBench** study evaluated 392 backend-generation tasks using functional tests and end-to-end exploits. On average, the researchers could exploit around half of the functionally correct programs generated by each evaluated model. [5](#ref-5)

Registration may work. Login may work. An application may retrieve a user's secret correctly.

The next test is trying to retrieve someone else's.

That is why I want fairness comparisons attached to concrete security properties. A preference for different wording is not the same as a missing ownership check. The evaluation needs to distinguish harmless variation from a difference that exposes somebody's data.

Anthropic's reasoning-faithfulness research adds another caution. In controlled experiments, models sometimes omitted influences on their answers from their explanations. That does not make reasoning traces useless. It makes them insufficient as the sole basis for authorizing an action. [6](#ref-6)

Its *Sleeper Agents* work demonstrated that deliberately trained, trigger-dependent insecure behavior could survive subsequent safety training. That establishes a technical possibility, not the cause of the Qwen or DeepSeek findings discussed here. [7](#ref-7)

We should be careful about both mistakes: dismissing a concrete failure because intent is uncertain, and treating a plausible explanation as proof of intent.

## What I would ask before deployment

I would want repeated security tests using the tasks the organization actually intends to delegate. I would want appropriately designed fairness comparisons. And I would want a clear account of the permissions the agent receives when it leaves the benchmark and enters a real workflow.

The records should distinguish a suggested command from an executed one, and an attempted transfer from a successful one. They should retain the model version, prompts, generation settings, tool calls, and network outcome needed to reproduce a finding. A screenshot of an alarming answer is a starting point, not a complete evaluation.

I would rerun the relevant tests after a model update, fine-tune, or material change to its tools. An assessment of yesterday's configuration is not automatically an assessment of today's system.

AITBM gives us a way to organize those questions and make evidence gaps visible. It does not make a model trustworthy because someone fills in a scorecard. I would not assign Qwen or DeepSeek a definitive IVP fairness score from these reports alone.

The useful contribution of fairness evaluation is specific: it asks whether some users receive materially worse treatment—including worse security—for reasons unrelated to the task.

That is a security question I want answered before deployment.

So when someone tells me their model runs locally, I have two follow-up questions:

**What happens when it tries something it should not?**

**And have you checked whether it gives all your users the same standard of protection?**

---

## References

1. <span id="ref-1"></span>Hirundo, [Qwen3-Coder vulnerabilities case study](https://www.hirundo.io/blog/qwen3-coder-vulnerabilities). Original figure reproduced with source attribution; rights remain with its owner.
2. <span id="ref-2"></span>Cohere, [Concerning behavior from a popular open-weight AI model](https://cohere.com/blog/concerning-behaviour-popular-open-weight-ai-model). Prefill chart redrawn from the report's data.
3. <span id="ref-3"></span>CrowdStrike, [Researchers identify hidden vulnerabilities in AI-coded software](https://www.crowdstrike.com/en-us/blog/crowdstrike-researchers-identify-hidden-vulnerabilities-ai-coded-software/).
4. <span id="ref-4"></span>Booz Allen, [What's in America's Code?](https://www.boozallen.com/expertise/cybersecurity/whats-in-americas-code.html) and [technical appendix](https://www.boozallen.com/content/dam/home/docs/cyber/whats-in-americas-code-technical-appendix.pdf).
5. <span id="ref-5"></span>Vero et al., [BaxBench: Can LLMs Generate Correct and Secure Backends?](https://proceedings.mlr.press/v267/vero25a.html), ICML 2025.
6. <span id="ref-6"></span>Anthropic, [Reasoning models don't always say what they think](https://www.anthropic.com/research/reasoning-models-dont-say-think).
7. <span id="ref-7"></span>Anthropic, [Sleeper Agents: Training deceptive LLMs that persist through safety training](https://www.anthropic.com/research/sleeper-agents-training-deceptive-llms-that-persist-through-safety-training).
8. <span id="ref-8"></span>AITBM, [Framework](https://aitbm.org/framework), [Demographic Parity](https://aitbm.org/submetrics/fa-1-demographic-parity), [Calibration Consistency](https://aitbm.org/submetrics/fa-2-calibration-consistency), and [Representation Bias](https://aitbm.org/submetrics/fa-3-representation-bias).
9. <span id="ref-9"></span>AITBM, [Counterfactual Fairness](https://aitbm.org/submetrics/fa-4-counterfactual-fairness).

*Disclosure: I lead the AITBM project. This article discusses published research, not experiments I have independently replicated. The proposed AITBM applications are my analysis; they are not completed assessments of the models discussed. Hirundo and Cohere are commercial AI companies, and their findings should be read alongside their methods and limitations.*
