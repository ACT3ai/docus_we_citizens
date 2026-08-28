#!/usr/bin/env python3
"""
Generate pages.csv — one row per UI page on the whole website.

The registry the cross-link pass reads: every page's stable key, where its file
lives, what URL it is served at, what it is about in 50 words or less, and the
phrases that, when they appear in prose on ANY other page, should become a link
to this one.
"""
import os, re, csv, sys

ROOT = os.path.dirname(os.path.abspath(__file__))
DOCS = 'site/docs'

# ---------------------------------------------------------------- frontmatter
def frontmatter(text):
    m = re.match(r'^---\n(.*?)\n---\n', text, re.S)
    d = {}
    if not m:
        return d
    for line in m.group(1).split('\n'):
        mm = re.match(r'^([a-zA-Z_]+):\s*(.*)$', line)
        if mm:
            v = mm.group(2).strip()
            if len(v) > 1 and v[0] == v[-1] and v[0] in '"\'':
                v = v[1:-1]
            d[mm.group(1)] = v
    return d

def slugify(s):
    s = re.sub(r'[^A-Za-z0-9]+', '_', s).strip('_').lower()
    return re.sub(r'_+', '_', s)

def cap_words(s, n=50):
    w = s.split()
    return ' '.join(w[:n]) if len(w) > n else s

# ---------------------------------------------------------------- phrase rules
# Single words distinctive enough to link on their own.
SINGLE_OK = {
    'meritocracy', 'karma', 'monkey', 'llama', 'flamingo', 'bonhoeffer',
    'bonhoeffers', 'whistleblowers', 'qualifications',
}
# Never link on these, however they arise — too common, or they would fire on
# every page and turn the prose into link soup.
BLOCK = {
    'overview', 'about us', 'about', 'the standard', 'restoring it', 'contribute',
    'areas', 'problems', 'decisions', 'communities', 'values', 'evidence', 'laws',
    'the movement', 'the problem', 'start here', 'get started', 'how it works',
    'features', 'product features', 'legal', 'terms of service', 'privacy policy',
    'first run', 'charter', 'board', 'introduction', 'intro', 'the list',
    'who can join', 'what it is', 'who it is for', 'the four doors', 'repos',
    'internal research', 'challenger profiles', 'in this area', 'the seat view',
}

# Extra phrases, keyed by page_key. These are the ones worth being deliberate
# about: the product's actual vocabulary.
EXTRA = {
 'congress_for_citizens_overview': ['congress working for citizens', 'hijacked control', 'captured congress'],
 'congress_for_citizens_money_in_politics': ['money in politics', 'campaign contributions', 'citizens united', 'leadership pacs'],
 'congress_for_citizens_the_globalist_deep_state': ['globalist deep state', 'global elites'],
 'congress_for_citizens_intelligence_service_capture': ['intelligence service capture'],
 'congress_for_citizens_expose_the_hijack': ['exposing the hijack'],
 'congress_for_citizens_remove_the_hijack': ['removing the hijack'],
 'non_partisan_site_overview': ['non-partisan site', 'non-partisan door', 'cross-party ground'],
 'non_partisan_site_what_crosses_both_parties': ['crosses both parties', 'damages both bases'],
 'non_partisan_site_the_cross_party_forum': ['cross-party forum', 'decision venue'],
 'non_partisan_site_what_lives_on_the_party_doors': ['lives only on a party door', 'only on the party doors'],
 'the_movement_overview': ['we the citizens movement'],
 'the_movement_charter': ['the charter'],
 'the_movement_four_pillars': ['four pillars'],
 'how_it_works_the_core_loop': ['the core loop'],
 'how_it_works_individual_vs_community_mode': ['individual mode', 'community mode'],
 'get_started_run_it_on_your_computer': ['run it on your own machine', 'runs on your own computer', 'local-first'],
 'get_started_use_it_hosted': ['the hosted copy'],
 'social_contract_overview': ['the social contract'],
 'social_contract_misalignment_vs_disagreement': ['misalignment', 'misaligned'],
 'american_ethics_overview': ['great american ethics', 'american ethical standard'],
 'problems_what_is_a_problem_record': ['problem record'],
 'problems_how_problems_are_ranked': ['how problems are ranked'],
 'rigged_economy_overview': ['the rigged economy', 'rigged economy'],
 'rigged_economy_how_the_rigging_works': ['how the rigging works'],
 'rigged_economy_document_it_yourself': ['document it yourself'],
 'rigged_economy_the_fix_both_sides_support': ['a fix both sides will sign', 'signable by both'],
 'deep_state_overview': ['the deep state', 'epstein class'],
 'deep_state_who_the_deep_state_is': ['who the deep state is'],
 'deep_state_the_documented_crimes': ['documented crimes'],
 'deep_state_the_withheld_files': ['withheld files', 'the epstein files', 'jfk assassination records'],
 'us_intelligence_overview': ['us intelligence'],
 'us_intelligence_whistleblowers': ['whistleblower protection', 'whistleblowers'],
 'us_intelligence_no_puppet_master_over_politics': ['puppet master over us politics'],
 'foreign_intelligence_overview': ['foreign intelligence', 'a foreign service'],
 'foreign_intelligence_paid_influence_operations': ['paid influencers', 'paid influence operations', 'propagandists'],
 'foreign_intelligence_removing_democracy_from_outside': ['narrative control'],
 'election_integrity_overview': ['election integrity'],
 'election_integrity_open_source_voting_tech': ['open-source voting technology', 'open source voting'],
 'election_integrity_reproduce_the_result': ['reproduce the result', 'reproduce the official result'],
 'election_integrity_audits_and_open_gaps': ['routine audits', 'open gaps'],
 'no_forever_wars_overview': ['forever wars', 'forever war', 'no draft'],
 'no_forever_wars_the_forever_war_pattern': ['the forever war pattern'],
 'no_forever_wars_remove_the_draft': ['remove the draft', 'conscription'],
 'no_forever_wars_who_pays_and_who_profits': ['who pays and who profits'],
 'no_social_credit_overview': ['social credit system', 'social credit score', 'social credit'],
 'no_social_credit_the_american_version': ['de-banking', 'remote shutdown'],
 'laws_the_four_libraries': ['four libraries'],
 'laws_law_vs_bill': ['a law is not a bill'],
 'problem_laws_overview': ['problem laws', 'problem law'],
 'problem_laws_how_badness_is_rated': ['badness rating'],
 'fix_laws_overview': ['fixing the law'],
 'good_bills_overview': ['fix bills', 'fix bill'],
 'good_laws_overview': ['good laws'],
 'good_laws_who_blocked_it': ['who blocked it', 'record of obstruction'],
 'replace_incumbents_overview': ['captured incumbents', 'replacing captured incumbents', 'replace incumbents'],
 'replace_incumbents_challengers_first': ['challengers first'],
 'replace_incumbents_rally_behind_one_challenger': ['rally behind one challenger', 'split field'],
 'replace_incumbents_the_seat_view': ['the seat view', 'per-seat view'],
 'politicians_overview': ['politician record'],
 'politicians_award_not_a_score': ['awards, not scores', 'an award, never a score'],
 'politicians_the_wall': ['wall between the two kinds of evidence'],
 'legacy_politicians_overview': ['elected politicians'],
 'legacy_politicians_find_who_represents_you': ['who represents you', 'find who represents you'],
 'new_politicians_overview': ['good new leaders', 'new leaders'],
 'monkey_overview': ['monkey award', 'democracy damage'],
 'monkey_the_monkey_list': ['the monkey list'],
 'llama_overview': ['llama award', 'democracy repair'],
 'llama_the_good_law_list': ['good law list'],
 'flamingo_overview': ['flamingo award'],
 'flamingo_the_three_states': ['three states'],
 'voting_records_overview': ['voting record', 'voting records', 'roll call', 'roll calls'],
 'qualifications_overview': ['qualification areas', 'published rubrics', 'qualifications'],
 'qualifications_how_a_rubric_works': ['rubrics', 'a published rubric'],
 'meritocracy_overview': ['meritocracy'],
 'meritocracy_the_trust_ladder': ['the trust ladder'],
 'trust_scores_overview': ['trust score', 'trust scores'],
 'trust_scores_the_mesh_and_what_it_defends_against': ['the mesh', 'mesh of verified'],
 'trust_scores_the_read_only_rollup': ['read-only roll-up', 'the roll-up'],
 'trust_scores_built_and_voted_on_the_party_doors': ['built and voted on the party doors'],
 'decisions_record_a_position': ['record a position', 'record where you stand'],
 'decisions_community_consensus': ['community consensus'],
 'communities_what_is_a_community': ['what is a community'],
 'values_write_down_your_values': ['value system', 'value systems'],
 'values_policy_packets': ['policy packet', 'policy packets'],
 'evidence_chain_of_evidence': ['chain of evidence', 'evidence chain'],
 'evidence_naming_the_gaps': ['naming the gaps', 'named gap', 'open gap'],
 'evidence_your_confidence_threshold': ['confidence threshold'],
 'take_action_overview': ['take action'],
 'take_action_the_action_catalog': ['action catalog', 'action catalogue'],
 'take_action_call_your_representative': ['call your representative'],
 'karma_overview': ['karma'],
 'karma_the_leader_history_book': ['history book of citizens'],
 'open_data_overview': ['open data'],
 'open_data_clone_the_record': ['clone the record'],
 'open_data_the_sourcing_rule': ['the sourcing rule', 'sourced at the door'],
 'ai_overview': ['the ai assistant'],
 'ai_what_the_ai_never_decides': ['what the ai never decides'],
 'repos_overview': ['open source', 'the public repository'],
 'four_doors_overview': ['one app, four doors', 'four party doors', 'the four party front doors'],
 'four_doors_find_your_door': ['find your door'],
 'r_overview': ['we the citizens r', 'wecitizensr.com'],
 'd_overview': ['we the citizens d', 'wecitizensd.com'],
 'l_overview': ['we the citizens l', 'wecitizensl.com'],
 's_overview': ['we the citizens s', 'wecitizenssocialism.com'],
}

def phrases_for(key, title):
    out = []
    t = title.strip().rstrip('.').lower()
    t = re.sub(r'^(the|a|an)\s+', '', t)
    t = re.sub(r'\s*[—:-]\s*overview$', '', t)
    if t and t not in BLOCK:
        words = t.split()
        if len(words) >= 2 or t in SINGLE_OK:
            out.append(t)
    for p in EXTRA.get(key, []):
        if p not in out:
            out.append(p)
    return [p for p in out if p not in BLOCK]

# ---------------------------------------------------------------------- walk
rows = []
seen = set()
for dirpath, dirs, files in os.walk(DOCS):
    for f in sorted(files):
        if not f.endswith(('.md', '.mdx')):
            continue
        p = os.path.join(dirpath, f)
        rel = os.path.relpath(p, DOCS).replace(os.sep, '/')
        text = open(p).read()
        d = frontmatter(text)
        base = os.path.splitext(f)[0]
        did = d.get('id') or base
        reldir = os.path.dirname(rel)

        slug = d.get('slug')
        if slug:
            url = '/docs' + (slug if slug.startswith('/') else '/' + slug)
        else:
            url = '/docs/' + ((reldir + '/') if reldir else '') + did
        url = url.rstrip('/') + '/'

        parts = rel.rsplit('.', 1)[0].split('/')
        key = slugify('_'.join(parts))
        n = 2
        while key in seen:
            key = f'{slugify("_".join(parts))}_{n}'; n += 1
        seen.add(key)

        seg = parts[0]
        edition = seg if seg in ('r', 'd', 'l', 's') else 'main'
        if edition != 'main':
            area = parts[1] if len(parts) > 2 else edition
            if len(parts) == 2:
                level = 'door' if base == 'overview' else '3'
            else:
                level = '2' if base == 'overview' else '3'
        else:
            area = seg if len(parts) > 1 else ''
            level = '1' if len(parts) == 1 else ('2' if base == 'overview' else '3')

        title = d.get('title', base.replace('_', ' '))
        rows.append({
            'page_key': key,
            'title': title,
            'level': level,
            'edition': edition,
            'level_2_area': area,
            'file_path': rel,
            'url_path': url,
            'description': cap_words(d.get('description', '').strip(), 50),
            'link_phrases': '; '.join(phrases_for(key, title)),
        })

rows.sort(key=lambda r: (r['edition'] != 'main', r['edition'], r['level_2_area'], r['level'], r['file_path']))

FIELDS = ['page_key', 'title', 'level', 'edition', 'level_2_area',
          'file_path', 'url_path', 'description', 'link_phrases']
with open('pages.csv', 'w', newline='') as fh:
    w = csv.DictWriter(fh, fieldnames=FIELDS)
    w.writeheader()
    w.writerows(rows)

print('pages.csv rows:', len(rows))
print('with phrases:', sum(1 for r in rows if r['link_phrases']))
print('missing description:', sum(1 for r in rows if not r['description']))
